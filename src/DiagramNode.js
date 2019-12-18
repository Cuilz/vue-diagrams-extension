import { generateId } from './utils'
import { PORT_TYPE } from './constant'
import cloneDeep from 'lodash/cloneDeep'

/**
 * @class DiagramNode
 */
class DiagramNode {
  /**
   *  This should not be called directly. Use the "addNode" method from the DiagramModel class
   * @param  {String} title  [description]
   * @param  {String} key  [description]
   * @param  {Integer} x      [description]
   * @param  {Integer} y      [description]
   * @param  {Integer} width  [description]
   * @param  {Integer} height [description]
   * @param  {Integer} id [description]
   * @param  {Object} extraInfo [description]
   */
  constructor(id, title, key, x, y, width, height, extraInfo) {
    this.id = id;
    this.title = title;
    this.key = key;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ports = [];
    this.extraInfo = extraInfo;
  }

  /**
   * Adds a new port into the node.
   * @param {String} name
   * @param {String} key
   * @param {Object} extraInfo
   * @return {Integer} The port id
   */
  addPort(name, key, extraInfo) {
    let newPort = {
      portId: generateId(),
      name,
      key,
      extraInfo
    };

    this.ports.push(cloneDeep({
      ...newPort,
      id: generateId(),
      type: PORT_TYPE.IN
    }));

    this.ports.push(cloneDeep({
      ...newPort,
      id: generateId(),
      type: PORT_TYPE.OUT
    }));

    return newPort.id;
  }

  /** set node's position
   * @param {name}
   */
  setNodePosition(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default DiagramNode;
