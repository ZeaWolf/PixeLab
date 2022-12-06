import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
    
    @author McKilla Gorilla
 */
export default class Draw_Transaction extends jsTPS_Transaction {
    constructor(initMap, layerIndex, layerKey, layerOldValue, LayerNewValue) {
        super();
        this.map = initMap;
        this.layerIndex = layerIndex;
        this.layerKey = layerKey;
        this.layerOldValue = layerOldValue;
        this.LayerNewValue = LayerNewValue;
    }

    doTransaction() {
        this.map.drawTile(this.oldItemIndex, this.newItemIndex);
    }
    
    undoTransaction() {
        this.map.drawTile(this.newItemIndex, this.oldItemIndex);
    }
}