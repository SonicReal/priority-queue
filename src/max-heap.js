const Node = require('./node');

class MaxHeap {

    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heap = [];
    }

    push(data, priority) {
        const node = new Node(data, priority)
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        const value = this.heap.pop();

    }

    detachRoot() {

    }

    restoreRootFromLastInsertedNode(detached) {

    }

    size(el = this.root) {
        if (el === null) {
            return 0;
        }
        return 1 + this.size(el.left) + this.size(el.right);
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
        this.heap = [];
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.parentNodes[0].appendChild(node);
        }
        this.heap.push(node);
        if (this.parentNodes.length > 0 && this.parentNodes[0].left && this.parentNodes[0].right) {
            this.parentNodes.splice(0, 1);
        }
        this.parentNodes.push(node);
    }

    shiftNodeUp(node) {
        const parent = node.parent;
        if (!parent) {
            this.root = node;
            return;
        }

    }

    shiftNodeDown(node) {

    }
}

module.exports = MaxHeap;
