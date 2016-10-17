package graph

import graph.Graph.*
import graph.Graph.TermForm.Term
import java.util.*
import kotlin.Pair

fun onLoad(): (String) -> Json {
    return { s: String ->
        //    val graph = "[a-b, b-c, a-c, a-d]".toGraph()
        //    val graph = "[a-b/5, a-d/3, b-c/2, b-e/4, c-e/6, d-e/7, d-f/4, d-g/3, e-h/5, f-g/4, g-h/1]".toLabeledGraph()
        val graph = s.toLabeledGraph()
        val steps = mutableListOf<Edge<String, Int>>()
        graph.minSpanningTree(steps)
        json(
            Pair("graph", graph.toJson()),
            Pair("steps", steps.reversed().map { it.toJson() }.toTypedArray())
        )
    }
}


fun <T, U> Graph<T, U>.toJson(): Json {
    val nodesAsJson = nodes.values.map{ it.toJson() }.toTypedArray()
    val edgesAsJson = edges.map{ it.toJson() }.toTypedArray()
    return json(Pair("nodes", nodesAsJson), Pair("links", edgesAsJson))
}
fun <T, U> Node<T, U>.toJson(): Json {
    return json(
        Pair("id", value),
        Pair("group", 1)
    )
}
fun <T, U> Edge<T, U>.toJson(): Json {
    return json(
        Pair("source", n1.value),
        Pair("target", n2.value),
        Pair("value", 1),
        Pair("label", label)
    )
}


fun <T, U: Comparable<U>> Graph<T, U>.minSpanningTree(steps: MutableList<Edge<T, U>> = mutableListOf()): Graph<T, U> {
    fun Edge<T, U>.contains(node: Node<T, U>) = n1 == node || n2 == node
    fun Edge<T, U>.connectsTo(nodes: List<Node<T, U>>) = nodes.contains(n1) != nodes.contains(n2)
    fun Edge<T, U>.toTerm() = Term(n1.value, n2.value, label)

    // Comparator is only required for tree without labels (i.e. with null label values).
    val comparator = Comparator<Edge<T, U>> { e1, e2 ->
        if (e1.label == null && e2.label == null) 0
        else if (e1.label == null) -1
        else if (e2.label == null) 1
        else e1.label?.compareTo(e2.label!!)!!
    }

    fun minSpanningTree(graphEdges: List<Edge<T, U>>, graphNodes: List<Node<T, U>>): Graph<T, U> {
        if (graphNodes.isEmpty()) {
            return Graph.labeledTerms(TermForm(nodes.keys, (edges - graphEdges).map { it.toTerm() }))
        } else {
            val edge = graphEdges.filter{ it.connectsTo(graphNodes) }.minWith(comparator)!!
            steps.add(edge)
            return minSpanningTree(
                    graphEdges.filterNot{ it == edge },
                    graphNodes.filterNot{ edge.contains(it) }
            )
        }
    }

    return minSpanningTree(edges, nodes.values.drop(1))
}


class Graph<T, U> {
    val nodes: MutableMap<T, Node<T, U>> = HashMap()
    val edges: MutableList<Edge<T, U>> = ArrayList()

    fun addNode(value: T): Node<T, U> {
        val node = Node<T, U>(value)
        nodes.put(value, node)
        return node
    }

    fun addUndirectedEdge(n1: T, n2: T, label: U?) {
        if (!nodes.contains(n1) || !nodes.contains(n2)) {
            throw IllegalStateException("Expected '$n1' and '$n2' nodes to exist in graph")
        }
        val edge = UndirectedEdge(nodes[n1]!!, nodes[n2]!!, label)
        if (edges.none{ it.equivalentTo(edge) }) {
            edges.add(edge)
            nodes[n1]!!.edges.add(edge)
            nodes[n2]!!.edges.add(edge)
        }
    }

    fun addDirectedEdge(source: T, dest: T, label: U?) {
        val edge = DirectedEdge(nodes[source]!!, nodes[dest]!!, label)
        if (!edges.contains(edge)) {
            edges.add(edge)
            nodes[source]!!.edges.add(edge)
        }
    }

    override fun toString(): String {
        val standaloneNodes = nodes.values.filter{ node -> edges.all { it.n1 != node && it.n2 != node } }
        val s = (edges.map{ it.toString() } + standaloneNodes.map{ it.toString() }).joinToString()
        return "[$s]"
    }

    override fun equals(other: Any?): Boolean {
        other as Graph<*, *>
        return nodes == other.nodes && edges == other.edges
    }

    override fun hashCode() = 31 * nodes.hashCode() + edges.hashCode()



    data class Node<T, U>(val value: T) {
        val edges: MutableList<Edge<T, U>> = ArrayList()
        fun neighbors(): List<Node<T, U>> = edges.map{ edge -> edge.target(this)!! }
        override fun toString() = value.toString()
    }

    interface Edge<T, U> {
        val n1: Node<T, U>
        val n2: Node<T, U>
        val label: U?
        fun target(node: Node<T, U>): Node<T, U>?
        fun equivalentTo(other: Edge<T, U>) =
                (n1 == other.n1 && n2 == other.n2) || (n1 == other.n2 && n2 == other.n1)
    }

    data class UndirectedEdge<T, U>(override val n1: Node<T, U>, override val n2: Node<T, U>, override val label: U?) : Edge<T, U> {
        override fun target(node: Node<T, U>) = if (n1 == node) n2 else if (n2 == node) n1 else null
        override fun toString() = n1.toString() + "-" + n2 + (if (label == null) "" else "/" + label.toString())
    }

    data class DirectedEdge<T, U>(override val n1: Node<T, U>, override val n2: Node<T, U>, override val label: U?) : Edge<T, U> {
        override fun target(node: Node<T, U>) = if (n1 == node) n2 else null
        override fun toString() = n1.toString() + ">" + n2 + (if (label == null) "" else "/" + label.toString())
    }


    data class TermForm<out T, out U>(val nodes: Collection<T>, val edges: List<Term<T, U>>) {
        data class Term<out T, out U>(val n1: T, val n2: T, val label: U? = null) {
            override fun toString() = if (label == null) "Term($n1, $n2)" else "Term($n1, $n2, $label)"
        }
    }

    data class AdjacencyList<T, out U>(val entries: List<Entry<T, U>>) {
        constructor(vararg entries: Entry<T, U>): this(entries.toList())
        override fun toString() = "AdjacencyList(${entries.joinToString()})"

        data class Entry<out T, out U>(val node: T, val links: List<Link<T, U>> = emptyList<Nothing>()) {
            constructor(node: T, vararg links: Link<T, U>): this(node, links.toList())
            override fun toString() = "Entry($node, links[${links.joinToString()}])"

            companion object {
                fun <T> links(vararg linkValues: T): List<Link<T, Nothing>> = linkValues.map { Link(it, null) }
            }
        }

        data class Link<out T, out U>(val node: T, val label: U? = null) {
            override fun toString() = if (label == null) "$node" else "$node/$label"
        }
    }

    companion object {
        fun <T> terms(termForm: TermForm<T, Nothing>): Graph<T, Nothing> {
            return createFromTerms(termForm) { graph, n1, n2, value -> graph.addUndirectedEdge(n1, n2, value) }
        }

        fun <T> directedTerms(termForm: TermForm<T, Nothing>): Graph<T, Nothing> {
            return createFromTerms(termForm) { graph, n1, n2, value -> graph.addDirectedEdge(n1, n2, value) }
        }

        fun <T, U> labeledTerms(termForm: TermForm<T, U>): Graph<T, U> {
            return createFromTerms(termForm) { graph, n1, n2, value -> graph.addUndirectedEdge(n1, n2, value) }
        }

        fun <T, U> labeledDirectedTerms(termForm: TermForm<T, U>): Graph<T, U> {
            return createFromTerms(termForm) { graph, n1, n2, value -> graph.addDirectedEdge(n1, n2, value) }
        }

        fun <T> adjacent(adjacencyList: AdjacencyList<T, Nothing>): Graph<T, *> {
            return fromAdjacencyList(adjacencyList) { graph, n1, n2, value ->
                graph.addUndirectedEdge(n1, n2, value)
            }
        }

        fun <T> directedAdjacent(adjacencyList: AdjacencyList<T, Nothing>): Graph<T, *> {
            return fromAdjacencyList(adjacencyList) { graph, n1, n2, value -> graph.addDirectedEdge(n1, n2, value) }
        }

        fun <T, U> labeledAdjacent(adjacencyList: AdjacencyList<T, U>): Graph<T, U> {
            return fromAdjacencyList(adjacencyList) { graph, n1, n2, value ->
                graph.addUndirectedEdge(n1, n2, value)
            }
        }

        fun <T, U> labeledDirectedAdjacent(adjacencyList: AdjacencyList<T, U>): Graph<T, U> {
            return fromAdjacencyList(adjacencyList) { graph, n1, n2, value ->
                graph.addDirectedEdge(n1, n2, value)
            }
        }

        private fun <T, U> createFromTerms(termForm: TermForm<T, U>, addFunction: (Graph<T, U>, T, T, U?) -> Unit): Graph<T, U> {
            val graph = Graph<T, U>()
            termForm.nodes.forEach { graph.addNode(it) }
            termForm.edges.forEach { addFunction(graph, it.n1, it.n2, it.label) }
            return graph
        }

        private fun <T, U> fromAdjacencyList(adjacencyList: AdjacencyList<T, U>,
                                             addFunction: (Graph<T, U>, T, T, U?) -> Unit): Graph<T, U> {
            val graph = Graph<T, U>()
            adjacencyList.entries.forEach { graph.addNode(it.node) }
            adjacencyList.entries.forEach{
                val (node, links) = it
                links.forEach{ addFunction(graph, node, it.node, it.label) }
            }
            return graph
        }
    }
}

private val graphTokenSeparators = Regex("[->/]")

fun String.toGraph(): Graph<String, Nothing> {
    if (!startsWith('[') || !endsWith(']')) {
        throw IllegalArgumentException("Expected string starting '[' and ending with ']' but it was '$this'")
    }
    val tokens = substring(1, length - 1).split(", ").map { it.split(graphTokenSeparators) }
    val nodes = tokens.flatMap{ it }.toCollection(LinkedHashSet())
    val edges = tokens.filter{ it.size == 2 }.map{ Term<String, Nothing>(it[0], it[1]) }
    if (contains("-")) {
        return Graph.terms(TermForm(nodes, edges))
    } else {
        return Graph.directedTerms(TermForm(nodes, edges))
    }
}

fun String.toLabeledGraph(): Graph<String, Int> {
    if (!startsWith('[') || !endsWith(']')) {
        throw IllegalArgumentException("Expected string starting '[' and ending with ']' but it was '$")
    }
    val tokens = substring(1, length - 1).split(", ").map { it.split(graphTokenSeparators) }
    val nodes = tokens.flatMap{ it.take(2) }.toCollection(LinkedHashSet())
    val edges = tokens.filter{ it.size == 3 }.map{ Term(it[0], it[1], parseInt(it[2])) }
    if (contains("-")) {
        return Graph.labeledTerms(TermForm(nodes, edges))
    } else {
        return Graph.labeledDirectedTerms(TermForm(nodes, edges))
    }
}
