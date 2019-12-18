import { storiesOf } from "@storybook/vue";
import Diagram from "../src/components/Diagram";

// Add more stories here to live develop your components
storiesOf("Diagram", module).add("serialization/deserialization", () => ({
  data() {
    const diagramModel = new Diagram.Model();

    const node1 = diagramModel.addNode(
      "用户信息 - userInfo",
      "userInfo",
      300,
      200,
      150,
      200
    );
    node1.addPort("id", "userInfo_id");
    node1.addPort("userId", "userInfo_userId");

    const node2 = diagramModel.addNode(
      "订单信息 - order",
      "orderInfo",
      10,
      300,
      150,
      200
    );
    node2.addPort("id", "orderInfo_id");
    node2.addPort("userId", "orderInfo_userId");
    node2.addPort("orderTime", "orderInfo_orderTime");
    node2.addPort("poiId", "orderInfo_poiId");

    const node3 = diagramModel.addNode(
      "POI信息 - poi",
      "poiInfo",
      10,
      100,
      150,
      200
    );
    node3.addPort("id", "poiInfo_id");
    node3.addPort("poiName", "poiInfo_poiName");

    // const node4 = diagramModel.addNode("POI信息 - poi", "poiInfo", 10, 200, 150, 80);
    // node4.addPort("id", 'poiInfo_id');
    // node4.addPort("poiName", 'poiInfo_poiName');

    // const node5 = diagramModel.addNode("POI信息 - poi", "poiInfo", 10, 100, 150, 80);
    // node5.addPort("id", 'poiInfo_id');
    // node5.addPort("poiName", 'poiInfo_poiName');

    return {
      console,
      serializedModel: diagramModel.serialize(),
      model: diagramModel
    };
  },
  template: `<div>
    <diagram :model="model" :width="800" :height="600" ></diagram>
    <button @click="console.log(model.serialize())">serialize</button>
    <button @click="model.redistribute(serializedModel)">redistribute</button>
  </div>`
}));
