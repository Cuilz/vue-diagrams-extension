import * as dagre from "dagre";
import DiagramNode from "./DiagramNode";
import { generateId } from './utils'

/**
 * @class DiagramModel
 */
class DiagramModel {
  /**
   */
  constructor() {
    this._model = {
      nodes: [],
      links: []
    };
  }

  /**
   * Adds a node to the diagram
   * @param {String} title  The title of the node
   * @param {Integer} x      X coordinate
   * @param {Integer} y      Y Coordinate
   * @param {Integer} width  Width
   * @param {Integer} height Height
   * @param {Object} extraInfo extraInfo
   * @return {Node} The node created
   */
  addNode(title, key, x, y, width, height, extraInfo) {
    const newNode = new DiagramNode(
      generateId(),
      title,
      key,
      x,
      y,
      width,
      height,
      extraInfo
    );
    this._model.nodes.push(newNode);
    return newNode;
  }

  /** get node by node's id
   */
  getNode(id) {
    return this._model.nodes.find(node => node.id === id);
  }

  /** delete node
   */
  deleteNode(node) {
    const index = this._model.nodes.indexOf(node);
    for (var j = 0; j < this._model.links.length; j++) {
      const currentLink = this._model.links[j];

      for (var i = 0; i < node.ports.length; i++) {
        const currentPort = node.ports[i];

        if (
          currentLink.from === currentPort.id ||
          currentLink.to === currentPort.id
        ) {
          this.deleteLink(currentLink);
          j--;
        }
      }
    }
    this._model.nodes.splice(index, 1);
  }

  /** delete link
   */
  deleteLink(link) {
    const index = this._model.links.indexOf(link);
    this._model.links.splice(index, 1);
  }

  /**
   * Adds a link between two ports
   * @param {Integer} from   Port id. Must be an out port
   * @param {Integer} to     Port id. Must be an in port
   * @param {Array}  points  Optional. Array of points to make the link represented as a segmented line
   */
  addLink(from, to, points = []) {
    this._model.links.push({
      id: generateId(),
      from: from,
      to: to,
      positionFrom: {},
      positionTo: {},
      points,
      selected: false
    });
  }

  /**
   * Serializes the diagram model into a JSON object
   * @return {Object} The diagram model
   */
  serialize() {
    console.log("model:", this._model);
    return JSON.stringify(this._model);
  }

  /**
   * Load into the diagram model a serialized diagram
   * @param  {Object} serializedModel
   */
  deserialize(serializedModel) {
    this._model = JSON.parse(serializedModel);
  }

  /**
   * redistribute graph
   */
  redistribute() {
    let g = new dagre.graphlib.Graph({
      multigraph: true
    });

    // Set an object for the graph label
    g.setGraph({});

    // Default to assigning a new object as a label for each new edge.
    g.setDefaultEdgeLabel(function() {
      return {};
    });

    // set nodes
    this._model.nodes.forEach(node => {
      g.setNode(node.id, { width: node.width, height: node.height });
    });

    // layout the graph
    dagre.layout(g);

    g.nodes().forEach(nodeId => {
      const node = g.node(nodeId);
      this.getNode(nodeId).setNodePosition(node.x, node.y);

      // TODO: abstract setPosition function
      // this.getNode(v).x = node.x;
      // this.getNode(v).y = node.y;
    });

    // TODO: layout link
  }
}

export default DiagramModel;
