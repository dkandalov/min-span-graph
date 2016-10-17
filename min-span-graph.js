this['min-span-graph'] = function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    graph: Kotlin.definePackage(function () {
      this.graphTokenSeparators_hj4hon$ = Kotlin.kotlin.text.Regex_61zpoe$('[->/]');
    }, /** @lends _.graph */ {
      onLoad$f: function (s) {
        var graph = _.graph.toLabeledGraph_pdl1w0$(s);
        var steps = Kotlin.kotlin.collections.mutableListOf_9mqe4v$([]);
        _.graph.minSpanningTree_7ci8ft$(graph, steps);
        var tmp$1 = new Kotlin.kotlin.Pair('graph', _.graph.toJson_bv87kg$(graph));
        var $receiver = Kotlin.kotlin.collections.reversed_q5oq31$(steps);
        var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
        var tmp$4;
        tmp$4 = $receiver.iterator();
        while (tmp$4.hasNext()) {
          var item = tmp$4.next();
          destination.add_za3rmp$(_.graph.toJson_hdfrsx$(item));
        }
        return Kotlin.kotlin.js.json_eoa9s7$([tmp$1, new Kotlin.kotlin.Pair('steps', Kotlin.copyToArray(destination))]);
      },
      onLoad: function () {
        return _.graph.onLoad$f;
      },
      toJson_bv87kg$: function ($receiver) {
        var $receiver_0 = $receiver.nodes.values;
        var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_0, 10));
        var tmp$2;
        tmp$2 = $receiver_0.iterator();
        while (tmp$2.hasNext()) {
          var item = tmp$2.next();
          destination.add_za3rmp$(_.graph.toJson_qhgzx8$(item));
        }
        var nodesAsJson = Kotlin.copyToArray(destination);
        var $receiver_1 = $receiver.edges;
        var destination_0 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_1, 10));
        var tmp$5;
        tmp$5 = $receiver_1.iterator();
        while (tmp$5.hasNext()) {
          var item_0 = tmp$5.next();
          destination_0.add_za3rmp$(_.graph.toJson_hdfrsx$(item_0));
        }
        var edgesAsJson = Kotlin.copyToArray(destination_0);
        return Kotlin.kotlin.js.json_eoa9s7$([new Kotlin.kotlin.Pair('nodes', nodesAsJson), new Kotlin.kotlin.Pair('links', edgesAsJson)]);
      },
      toJson_qhgzx8$: function ($receiver) {
        return Kotlin.kotlin.js.json_eoa9s7$([new Kotlin.kotlin.Pair('id', $receiver.value), new Kotlin.kotlin.Pair('group', 1)]);
      },
      toJson_hdfrsx$: function ($receiver) {
        return Kotlin.kotlin.js.json_eoa9s7$([new Kotlin.kotlin.Pair('source', $receiver.n1.value), new Kotlin.kotlin.Pair('target', $receiver.n2.value), new Kotlin.kotlin.Pair('value', 1), new Kotlin.kotlin.Pair('label', $receiver.label)]);
      },
      minSpanningTree_7ci8ft$contains: function (node) {
        return Kotlin.equals(this.n1, node) || Kotlin.equals(this.n2, node);
      },
      minSpanningTree_7ci8ft$connectsTo: function (nodes) {
        return !Kotlin.equals(nodes.contains_za3rmp$(this.n1), nodes.contains_za3rmp$(this.n2));
      },
      minSpanningTree_7ci8ft$toTerm: function () {
        return new _.graph.Graph.TermForm.Term(this.n1.value, this.n2.value, this.label);
      },
      minSpanningTree_7ci8ft$f: function (e1, e2) {
        var tmp$0, tmp$1, tmp$2;
        return e1.label == null && e2.label == null ? 0 : e1.label == null ? -1 : e2.label == null ? 1 : (tmp$2 = (tmp$1 = e1.label) != null ? Kotlin.compareTo(tmp$1, (tmp$0 = e2.label) != null ? tmp$0 : Kotlin.throwNPE()) : null) != null ? tmp$2 : Kotlin.throwNPE();
      },
      minSpanningTree_7ci8ft$minSpanningTree: function (this$minSpanningTree, closure$toTerm, closure$connectsTo, closure$comparator, closure$steps, closure$contains) {
        return function closure$minSpanningTree(graphEdges, graphNodes) {
          var tmp$0;
          if (graphNodes.isEmpty()) {
            var tmp$3 = this$minSpanningTree.nodes.keys;
            var $receiver = Kotlin.kotlin.collections.minus_71wgqg$(this$minSpanningTree.edges, graphEdges);
            var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
            var tmp$4;
            tmp$4 = $receiver.iterator();
            while (tmp$4.hasNext()) {
              var item = tmp$4.next();
              destination.add_za3rmp$(closure$toTerm.call(item));
            }
            return _.graph.Graph.Companion.labeledTerms_vaq6g0$(new _.graph.Graph.TermForm(tmp$3, destination));
          }
           else {
            var destination_0 = new Kotlin.ArrayList();
            var tmp$10;
            tmp$10 = graphEdges.iterator();
            while (tmp$10.hasNext()) {
              var element = tmp$10.next();
              if (closure$connectsTo.call(element, graphNodes)) {
                destination_0.add_za3rmp$(element);
              }
            }
            var edge = (tmp$0 = Kotlin.kotlin.collections.minWith_7dpn5g$(destination_0, closure$comparator)) != null ? tmp$0 : Kotlin.throwNPE();
            closure$steps.add_za3rmp$(edge);
            var tmp$8 = closure$minSpanningTree;
            var destination_1 = new Kotlin.ArrayList();
            var tmp$11;
            tmp$11 = graphEdges.iterator();
            while (tmp$11.hasNext()) {
              var element_0 = tmp$11.next();
              if (!Kotlin.equals(element_0, edge)) {
                destination_1.add_za3rmp$(element_0);
              }
            }
            var destination_2 = new Kotlin.ArrayList();
            var tmp$12;
            tmp$12 = graphNodes.iterator();
            while (tmp$12.hasNext()) {
              var element_1 = tmp$12.next();
              if (!closure$contains.call(edge, element_1)) {
                destination_2.add_za3rmp$(element_1);
              }
            }
            return tmp$8(destination_1, destination_2);
          }
        };
      },
      minSpanningTree_7ci8ft$: function ($receiver, steps) {
        if (steps === void 0)
          steps = Kotlin.kotlin.collections.mutableListOf_9mqe4v$([]);
        var contains = _.graph.minSpanningTree_7ci8ft$contains;
        var connectsTo = _.graph.minSpanningTree_7ci8ft$connectsTo;
        var toTerm = _.graph.minSpanningTree_7ci8ft$toTerm;
        var comparator = new Kotlin.java.util.Comparator$f(_.graph.minSpanningTree_7ci8ft$f);
        var minSpanningTree = _.graph.minSpanningTree_7ci8ft$minSpanningTree($receiver, toTerm, connectsTo, comparator, steps, contains);
        return minSpanningTree($receiver.edges, Kotlin.kotlin.collections.drop_cwv5p1$($receiver.nodes.values, 1));
      },
      Graph: Kotlin.createClass(null, function () {
        this.nodes = new Kotlin.ComplexHashMap();
        this.edges = new Kotlin.ArrayList();
      }, /** @lends _.graph.Graph.prototype */ {
        addNode_za3rmp$: function (value) {
          var node = new _.graph.Graph.Node(value);
          this.nodes.put_wn2jw4$(value, node);
          return node;
        },
        addUndirectedEdge_2br51b$: function (n1, n2, label) {
          var tmp$0, tmp$1, tmp$2, tmp$3;
          var $receiver = this.nodes;
          var tmp$5;
          var tmp$4 = !(Kotlin.isType(tmp$5 = $receiver, Kotlin.kotlin.collections.Map) ? tmp$5 : Kotlin.throwCCE()).containsKey_za3rmp$(n1);
          if (!tmp$4) {
            var $receiver_0 = this.nodes;
            var tmp$6;
            tmp$4 = !(Kotlin.isType(tmp$6 = $receiver_0, Kotlin.kotlin.collections.Map) ? tmp$6 : Kotlin.throwCCE()).containsKey_za3rmp$(n2);
          }
          if (tmp$4) {
            throw new Kotlin.IllegalStateException("Expected '" + n1 + "' and '" + n2 + "' nodes to exist in graph");
          }
          var edge = new _.graph.Graph.UndirectedEdge((tmp$0 = this.nodes.get_za3rmp$(n1)) != null ? tmp$0 : Kotlin.throwNPE(), (tmp$1 = this.nodes.get_za3rmp$(n2)) != null ? tmp$1 : Kotlin.throwNPE(), label);
          var $receiver_1 = this.edges;
          var none_udlcbx$result;
          none_udlcbx$break: {
            var tmp$7;
            tmp$7 = $receiver_1.iterator();
            while (tmp$7.hasNext()) {
              var element = tmp$7.next();
              if (element.equivalentTo_k27mwj$(edge)) {
                none_udlcbx$result = false;
                break none_udlcbx$break;
              }
            }
            none_udlcbx$result = true;
          }
          if (none_udlcbx$result) {
            this.edges.add_za3rmp$(edge);
            ((tmp$2 = this.nodes.get_za3rmp$(n1)) != null ? tmp$2 : Kotlin.throwNPE()).edges.add_za3rmp$(edge);
            ((tmp$3 = this.nodes.get_za3rmp$(n2)) != null ? tmp$3 : Kotlin.throwNPE()).edges.add_za3rmp$(edge);
          }
        },
        addDirectedEdge_2br51b$: function (source, dest, label) {
          var tmp$0, tmp$1, tmp$2;
          var edge = new _.graph.Graph.DirectedEdge((tmp$0 = this.nodes.get_za3rmp$(source)) != null ? tmp$0 : Kotlin.throwNPE(), (tmp$1 = this.nodes.get_za3rmp$(dest)) != null ? tmp$1 : Kotlin.throwNPE(), label);
          if (!this.edges.contains_za3rmp$(edge)) {
            this.edges.add_za3rmp$(edge);
            ((tmp$2 = this.nodes.get_za3rmp$(source)) != null ? tmp$2 : Kotlin.throwNPE()).edges.add_za3rmp$(edge);
          }
        },
        toString: function () {
          var $receiver = this.nodes.values;
          var destination = new Kotlin.ArrayList();
          var tmp$3;
          tmp$3 = $receiver.iterator();
          while (tmp$3.hasNext()) {
            var element = tmp$3.next();
            var predicate$result;
            predicate$break: {
              var tmp$4;
              tmp$4 = this.edges.iterator();
              while (tmp$4.hasNext()) {
                var element_0 = tmp$4.next();
                if (!(!Kotlin.equals(element_0.n1, element) && !Kotlin.equals(element_0.n2, element))) {
                  predicate$result = false;
                  break predicate$break;
                }
              }
              predicate$result = true;
            }
            if (predicate$result) {
              destination.add_za3rmp$(element);
            }
          }
          var standaloneNodes = destination;
          var $receiver_0 = this.edges;
          var destination_0 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_0, 10));
          var tmp$5;
          tmp$5 = $receiver_0.iterator();
          while (tmp$5.hasNext()) {
            var item = tmp$5.next();
            destination_0.add_za3rmp$(item.toString());
          }
          var destination_1 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault(standaloneNodes, 10));
          var tmp$8;
          tmp$8 = standaloneNodes.iterator();
          while (tmp$8.hasNext()) {
            var item_0 = tmp$8.next();
            destination_1.add_za3rmp$(item_0.toString());
          }
          var s = Kotlin.kotlin.collections.joinToString_ld60a2$(Kotlin.kotlin.collections.plus_hfjk0c$(destination_0, destination_1));
          return '[' + s + ']';
        },
        equals_za3rmp$: function (other) {
          var tmp$0;
          Kotlin.isType(tmp$0 = other, _.graph.Graph) ? tmp$0 : Kotlin.throwCCE();
          return Kotlin.equals(this.nodes, other.nodes) && Kotlin.equals(this.edges, other.edges);
        },
        hashCode: function () {
          return 31 * Kotlin.hashCode(this.nodes) + Kotlin.hashCode(this.edges);
        }
      }, /** @lends _.graph.Graph */ {
        Node: Kotlin.createClass(null, function (value) {
          this.value = value;
          this.edges = new Kotlin.ArrayList();
        }, /** @lends _.graph.Graph.Node.prototype */ {
          neighbors: function () {
            var $receiver = this.edges;
            var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver, 10));
            var tmp$0;
            tmp$0 = $receiver.iterator();
            while (tmp$0.hasNext()) {
              var item = tmp$0.next();
              var tmp$3;
              destination.add_za3rmp$((tmp$3 = item.target_qn3cdq$(this)) != null ? tmp$3 : Kotlin.throwNPE());
            }
            return destination;
          },
          toString: function () {
            return Kotlin.toString(this.value);
          },
          component1: function () {
            return this.value;
          },
          copy_za3rmp$: function (value) {
            return new _.graph.Graph.Node(value === void 0 ? this.value : value);
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.value) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.value, other.value))));
          }
        }, /** @lends _.graph.Graph.Node */ {
        }),
        Edge: Kotlin.createTrait(null, /** @lends _.graph.Graph.Edge.prototype */ {
          equivalentTo_k27mwj$: function (other) {
            return Kotlin.equals(this.n1, other.n1) && Kotlin.equals(this.n2, other.n2) || (Kotlin.equals(this.n1, other.n2) && Kotlin.equals(this.n2, other.n1));
          }
        }),
        UndirectedEdge: Kotlin.createClass(function () {
          return [_.graph.Graph.Edge];
        }, function (n1, n2, label) {
          this.$n1_c93499$ = n1;
          this.$n2_c93498$ = n2;
          this.$label_ge7dtw$ = label;
        }, /** @lends _.graph.Graph.UndirectedEdge.prototype */ {
          n1: {
            get: function () {
              return this.$n1_c93499$;
            }
          },
          n2: {
            get: function () {
              return this.$n2_c93498$;
            }
          },
          label: {
            get: function () {
              return this.$label_ge7dtw$;
            }
          },
          target_qn3cdq$: function (node) {
            return Kotlin.equals(this.n1, node) ? this.n2 : Kotlin.equals(this.n2, node) ? this.n1 : null;
          },
          toString: function () {
            return this.n1.toString() + '-' + this.n2 + (this.label == null ? '' : '/' + this.label.toString());
          },
          component1: function () {
            return this.n1;
          },
          component2: function () {
            return this.n2;
          },
          component3: function () {
            return this.label;
          },
          copy_wflwv3$: function (n1, n2, label) {
            return new _.graph.Graph.UndirectedEdge(n1 === void 0 ? this.n1 : n1, n2 === void 0 ? this.n2 : n2, label === void 0 ? this.label : label);
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.n1) | 0;
            result = result * 31 + Kotlin.hashCode(this.n2) | 0;
            result = result * 31 + Kotlin.hashCode(this.label) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.n1, other.n1) && Kotlin.equals(this.n2, other.n2) && Kotlin.equals(this.label, other.label)))));
          }
        }),
        DirectedEdge: Kotlin.createClass(function () {
          return [_.graph.Graph.Edge];
        }, function (n1, n2, label) {
          this.$n1_wm9q3w$ = n1;
          this.$n2_wm9q3x$ = n2;
          this.$label_wo9eol$ = label;
        }, /** @lends _.graph.Graph.DirectedEdge.prototype */ {
          n1: {
            get: function () {
              return this.$n1_wm9q3w$;
            }
          },
          n2: {
            get: function () {
              return this.$n2_wm9q3x$;
            }
          },
          label: {
            get: function () {
              return this.$label_wo9eol$;
            }
          },
          target_qn3cdq$: function (node) {
            return Kotlin.equals(this.n1, node) ? this.n2 : null;
          },
          toString: function () {
            return this.n1.toString() + '>' + this.n2 + (this.label == null ? '' : '/' + this.label.toString());
          },
          component1: function () {
            return this.n1;
          },
          component2: function () {
            return this.n2;
          },
          component3: function () {
            return this.label;
          },
          copy_wflwv3$: function (n1, n2, label) {
            return new _.graph.Graph.DirectedEdge(n1 === void 0 ? this.n1 : n1, n2 === void 0 ? this.n2 : n2, label === void 0 ? this.label : label);
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.n1) | 0;
            result = result * 31 + Kotlin.hashCode(this.n2) | 0;
            result = result * 31 + Kotlin.hashCode(this.label) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.n1, other.n1) && Kotlin.equals(this.n2, other.n2) && Kotlin.equals(this.label, other.label)))));
          }
        }),
        TermForm: Kotlin.createClass(null, function (nodes, edges) {
          this.nodes = nodes;
          this.edges = edges;
        }, /** @lends _.graph.Graph.TermForm.prototype */ {
          component1: function () {
            return this.nodes;
          },
          component2: function () {
            return this.edges;
          },
          copy_i4ogsx$: function (nodes, edges) {
            return new _.graph.Graph.TermForm(nodes === void 0 ? this.nodes : nodes, edges === void 0 ? this.edges : edges);
          },
          toString: function () {
            return 'TermForm(nodes=' + Kotlin.toString(this.nodes) + (', edges=' + Kotlin.toString(this.edges)) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.nodes) | 0;
            result = result * 31 + Kotlin.hashCode(this.edges) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.nodes, other.nodes) && Kotlin.equals(this.edges, other.edges)))));
          }
        }, /** @lends _.graph.Graph.TermForm */ {
          Term: Kotlin.createClass(null, function (n1, n2, label) {
            if (label === void 0)
              label = null;
            this.n1 = n1;
            this.n2 = n2;
            this.label = label;
          }, /** @lends _.graph.Graph.TermForm.Term.prototype */ {
            toString: function () {
              return this.label == null ? 'Term(' + this.n1 + ', ' + this.n2 + ')' : 'Term(' + this.n1 + ', ' + this.n2 + ', ' + Kotlin.toString(this.label) + ')';
            },
            component1: function () {
              return this.n1;
            },
            component2: function () {
              return this.n2;
            },
            component3: function () {
              return this.label;
            },
            copy_2br51b$: function (n1, n2, label) {
              return new _.graph.Graph.TermForm.Term(n1 === void 0 ? this.n1 : n1, n2 === void 0 ? this.n2 : n2, label === void 0 ? this.label : label);
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.n1) | 0;
              result = result * 31 + Kotlin.hashCode(this.n2) | 0;
              result = result * 31 + Kotlin.hashCode(this.label) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.n1, other.n1) && Kotlin.equals(this.n2, other.n2) && Kotlin.equals(this.label, other.label)))));
            }
          })
        }),
        AdjacencyList: Kotlin.createClass(null, function (entries) {
          this.entries = entries;
        }, /** @lends _.graph.Graph.AdjacencyList.prototype */ {
          toString: function () {
            return 'AdjacencyList(' + Kotlin.kotlin.collections.joinToString_ld60a2$(this.entries) + ')';
          },
          component1: function () {
            return this.entries;
          },
          copy_hky4yc$: function (entries) {
            return new _.graph.Graph.AdjacencyList_init_wa0ul8$(entries === void 0 ? this.entries : entries);
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.entries) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.entries, other.entries))));
          }
        }, /** @lends _.graph.Graph.AdjacencyList */ {
          Entry: Kotlin.createClass(null, function (node, links) {
            if (links === void 0)
              links = Kotlin.kotlin.collections.emptyList();
            this.node = node;
            this.links = links;
          }, /** @lends _.graph.Graph.AdjacencyList.Entry.prototype */ {
            toString: function () {
              return 'Entry(' + this.node + ', links[' + Kotlin.kotlin.collections.joinToString_ld60a2$(this.links) + '])';
            },
            component1: function () {
              return this.node;
            },
            component2: function () {
              return this.links;
            },
            copy_6m5pux$: function (node, links) {
              return new _.graph.Graph.AdjacencyList.Entry_init_bx4j8n$(node === void 0 ? this.node : node, links === void 0 ? this.links : links);
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.node) | 0;
              result = result * 31 + Kotlin.hashCode(this.links) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.node, other.node) && Kotlin.equals(this.links, other.links)))));
            }
          }, /** @lends _.graph.Graph.AdjacencyList.Entry */ {
            Companion: Kotlin.createObject(null, null, /** @lends _.graph.Graph.AdjacencyList.Entry.Companion.prototype */ {
              links_9mqe4v$: function (linkValues) {
                var destination = new Kotlin.ArrayList(linkValues.length);
                var tmp$0, tmp$1, tmp$2;
                tmp$0 = linkValues, tmp$1 = tmp$0.length;
                for (var tmp$2 = 0; tmp$2 !== tmp$1; ++tmp$2) {
                  var item = tmp$0[tmp$2];
                  destination.add_za3rmp$(new _.graph.Graph.AdjacencyList.Link(item, null));
                }
                return destination;
              }
            }, /** @lends _.graph.Graph.AdjacencyList.Entry.Companion */ {
            }),
            object_initializer$: function () {
              _.graph.Graph.AdjacencyList.Entry.Companion;
            }
          }),
          Entry_init_bx4j8n$: function (node, links, $this) {
            $this = $this || Object.create(_.graph.Graph.AdjacencyList.Entry.prototype);
            _.graph.Graph.AdjacencyList.Entry.call($this, node, Kotlin.kotlin.collections.toList_eg9ybj$(links));
            return $this;
          },
          Link: Kotlin.createClass(null, function (node, label) {
            if (label === void 0)
              label = null;
            this.node = node;
            this.label = label;
          }, /** @lends _.graph.Graph.AdjacencyList.Link.prototype */ {
            toString: function () {
              return this.label == null ? this.node.toString() : this.node + '/' + Kotlin.toString(this.label);
            },
            component1: function () {
              return this.node;
            },
            component2: function () {
              return this.label;
            },
            copy_wn2jw4$: function (node, label) {
              return new _.graph.Graph.AdjacencyList.Link(node === void 0 ? this.node : node, label === void 0 ? this.label : label);
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.node) | 0;
              result = result * 31 + Kotlin.hashCode(this.label) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (typeof other === 'object' && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.node, other.node) && Kotlin.equals(this.label, other.label)))));
            }
          })
        }),
        AdjacencyList_init_wa0ul8$: function (entries, $this) {
          $this = $this || Object.create(_.graph.Graph.AdjacencyList.prototype);
          _.graph.Graph.AdjacencyList.call($this, Kotlin.kotlin.collections.toList_eg9ybj$(entries));
          return $this;
        },
        Companion: Kotlin.createObject(null, null, /** @lends _.graph.Graph.Companion.prototype */ {
          terms_fmb1gf$: function (termForm) {
            return _.graph.Graph.Companion.createFromTerms(termForm, _.graph.Graph.Companion.terms_fmb1gf$f);
          },
          directedTerms_fmb1gf$: function (termForm) {
            return _.graph.Graph.Companion.createFromTerms(termForm, _.graph.Graph.Companion.directedTerms_fmb1gf$f);
          },
          labeledTerms_vaq6g0$: function (termForm) {
            return _.graph.Graph.Companion.createFromTerms(termForm, _.graph.Graph.Companion.labeledTerms_vaq6g0$f);
          },
          labeledDirectedTerms_vaq6g0$: function (termForm) {
            return _.graph.Graph.Companion.createFromTerms(termForm, _.graph.Graph.Companion.labeledDirectedTerms_vaq6g0$f);
          },
          adjacent_b1t6h7$: function (adjacencyList) {
            return _.graph.Graph.Companion.fromAdjacencyList(adjacencyList, _.graph.Graph.Companion.adjacent_b1t6h7$f);
          },
          directedAdjacent_b1t6h7$: function (adjacencyList) {
            return _.graph.Graph.Companion.fromAdjacencyList(adjacencyList, _.graph.Graph.Companion.directedAdjacent_b1t6h7$f);
          },
          labeledAdjacent_ajiq16$: function (adjacencyList) {
            return _.graph.Graph.Companion.fromAdjacencyList(adjacencyList, _.graph.Graph.Companion.labeledAdjacent_ajiq16$f);
          },
          labeledDirectedAdjacent_ajiq16$: function (adjacencyList) {
            return _.graph.Graph.Companion.fromAdjacencyList(adjacencyList, _.graph.Graph.Companion.labeledDirectedAdjacent_ajiq16$f);
          },
          createFromTerms: function (termForm, addFunction) {
            var graph = new _.graph.Graph();
            var tmp$0;
            tmp$0 = termForm.nodes.iterator();
            while (tmp$0.hasNext()) {
              var element = tmp$0.next();
              graph.addNode_za3rmp$(element);
            }
            var tmp$1;
            tmp$1 = termForm.edges.iterator();
            while (tmp$1.hasNext()) {
              var element_0 = tmp$1.next();
              addFunction(graph, element_0.n1, element_0.n2, element_0.label);
            }
            return graph;
          },
          fromAdjacencyList: function (adjacencyList, addFunction) {
            var graph = new _.graph.Graph();
            var tmp$0;
            tmp$0 = adjacencyList.entries.iterator();
            while (tmp$0.hasNext()) {
              var element = tmp$0.next();
              graph.addNode_za3rmp$(element.node);
            }
            var tmp$1;
            tmp$1 = adjacencyList.entries.iterator();
            while (tmp$1.hasNext()) {
              var element_0 = tmp$1.next();
              var tmp$3 = element_0
              , node = tmp$3.component1()
              , links = tmp$3.component2();
              var tmp$2;
              tmp$2 = links.iterator();
              while (tmp$2.hasNext()) {
                var element_1 = tmp$2.next();
                addFunction(graph, node, element_1.node, element_1.label);
              }
            }
            return graph;
          }
        }, /** @lends _.graph.Graph.Companion */ {
          terms_fmb1gf$f: function (graph, n1, n2, value) {
            graph.addUndirectedEdge_2br51b$(n1, n2, value);
          },
          directedTerms_fmb1gf$f: function (graph, n1, n2, value) {
            graph.addDirectedEdge_2br51b$(n1, n2, value);
          },
          labeledTerms_vaq6g0$f: function (graph, n1, n2, value) {
            graph.addUndirectedEdge_2br51b$(n1, n2, value);
          },
          labeledDirectedTerms_vaq6g0$f: function (graph, n1, n2, value) {
            graph.addDirectedEdge_2br51b$(n1, n2, value);
          },
          adjacent_b1t6h7$f: function (graph, n1, n2, value) {
            graph.addUndirectedEdge_2br51b$(n1, n2, value);
          },
          directedAdjacent_b1t6h7$f: function (graph, n1, n2, value) {
            graph.addDirectedEdge_2br51b$(n1, n2, value);
          },
          labeledAdjacent_ajiq16$f: function (graph, n1, n2, value) {
            graph.addUndirectedEdge_2br51b$(n1, n2, value);
          },
          labeledDirectedAdjacent_ajiq16$f: function (graph, n1, n2, value) {
            graph.addDirectedEdge_2br51b$(n1, n2, value);
          }
        }),
        object_initializer$: function () {
          _.graph.Graph.Companion;
        }
      }),
      toGraph_pdl1w0$: function ($receiver) {
        if (!Kotlin.kotlin.text.startsWith_cjsvxq$($receiver, '[') || !Kotlin.kotlin.text.endsWith_cjsvxq$($receiver, ']')) {
          throw new Kotlin.IllegalArgumentException("Expected string starting '[' and ending with ']' but it was '" + $receiver + "'");
        }
        var $receiver_0 = Kotlin.kotlin.text.split_l2gz7$($receiver.substring(1, $receiver.length - 1), [', ']);
        var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_0, 10));
        var tmp$2;
        tmp$2 = $receiver_0.iterator();
        while (tmp$2.hasNext()) {
          var item = tmp$2.next();
          var tmp$4 = destination.add_za3rmp$.bind(destination);
          var regex = _.graph.graphTokenSeparators_hj4hon$;
          var limit;
          if (limit === void 0) {
            limit = 0;
          }
          tmp$4(regex.split_905azu$(item, limit));
        }
        var tokens = destination;
        var destination_0 = new Kotlin.ArrayList();
        var tmp$5;
        tmp$5 = tokens.iterator();
        while (tmp$5.hasNext()) {
          var element = tmp$5.next();
          var list = element;
          Kotlin.kotlin.collections.addAll_fwwv5a$(destination_0, list);
        }
        var nodes = Kotlin.kotlin.collections.toCollection_xc5ofo$(destination_0, new Kotlin.LinkedHashSet());
        var destination_1 = new Kotlin.ArrayList();
        var tmp$6;
        tmp$6 = tokens.iterator();
        while (tmp$6.hasNext()) {
          var element_0 = tmp$6.next();
          if (element_0.size === 2) {
            destination_1.add_za3rmp$(element_0);
          }
        }
        var destination_2 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault(destination_1, 10));
        var tmp$7;
        tmp$7 = destination_1.iterator();
        while (tmp$7.hasNext()) {
          var item_0 = tmp$7.next();
          destination_2.add_za3rmp$(new _.graph.Graph.TermForm.Term(item_0.get_za3lpa$(0), item_0.get_za3lpa$(1)));
        }
        var edges = destination_2;
        if (Kotlin.kotlin.text.contains_kzp0od$($receiver, '-')) {
          return _.graph.Graph.Companion.terms_fmb1gf$(new _.graph.Graph.TermForm(nodes, edges));
        }
         else {
          return _.graph.Graph.Companion.directedTerms_fmb1gf$(new _.graph.Graph.TermForm(nodes, edges));
        }
      },
      toLabeledGraph_pdl1w0$: function ($receiver) {
        if (!Kotlin.kotlin.text.startsWith_cjsvxq$($receiver, '[') || !Kotlin.kotlin.text.endsWith_cjsvxq$($receiver, ']')) {
          throw new Kotlin.IllegalArgumentException("Expected string starting '[' and ending with ']' but it was '$");
        }
        var $receiver_0 = Kotlin.kotlin.text.split_l2gz7$($receiver.substring(1, $receiver.length - 1), [', ']);
        var destination = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault($receiver_0, 10));
        var tmp$2;
        tmp$2 = $receiver_0.iterator();
        while (tmp$2.hasNext()) {
          var item = tmp$2.next();
          var tmp$4 = destination.add_za3rmp$.bind(destination);
          var regex = _.graph.graphTokenSeparators_hj4hon$;
          var limit;
          if (limit === void 0) {
            limit = 0;
          }
          tmp$4(regex.split_905azu$(item, limit));
        }
        var tokens = destination;
        var destination_0 = new Kotlin.ArrayList();
        var tmp$5;
        tmp$5 = tokens.iterator();
        while (tmp$5.hasNext()) {
          var element = tmp$5.next();
          var list = Kotlin.kotlin.collections.take_cwv5p1$(element, 2);
          Kotlin.kotlin.collections.addAll_fwwv5a$(destination_0, list);
        }
        var nodes = Kotlin.kotlin.collections.toCollection_xc5ofo$(destination_0, new Kotlin.LinkedHashSet());
        var destination_1 = new Kotlin.ArrayList();
        var tmp$6;
        tmp$6 = tokens.iterator();
        while (tmp$6.hasNext()) {
          var element_0 = tmp$6.next();
          if (element_0.size === 3) {
            destination_1.add_za3rmp$(element_0);
          }
        }
        var destination_2 = new Kotlin.ArrayList(Kotlin.kotlin.collections.collectionSizeOrDefault(destination_1, 10));
        var tmp$7;
        tmp$7 = destination_1.iterator();
        while (tmp$7.hasNext()) {
          var item_0 = tmp$7.next();
          destination_2.add_za3rmp$(new _.graph.Graph.TermForm.Term(item_0.get_za3lpa$(0), item_0.get_za3lpa$(1), parseInt(item_0.get_za3lpa$(2))));
        }
        var edges = destination_2;
        if (Kotlin.kotlin.text.contains_kzp0od$($receiver, '-')) {
          return _.graph.Graph.Companion.labeledTerms_vaq6g0$(new _.graph.Graph.TermForm(nodes, edges));
        }
         else {
          return _.graph.Graph.Companion.labeledDirectedTerms_vaq6g0$(new _.graph.Graph.TermForm(nodes, edges));
        }
      }
    })
  });
  Kotlin.defineModule('min-span-graph', _);
  return _;
}(kotlin);
