const Node = require('./node');

class MaxHeap {

    constructor() {
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        const node = new Node(data, priority)
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {

    }

    detachRoot() {

    }

    restoreRootFromLastInsertedNode(detached) {

    }

    size() {

    }

    isEmpty() {

    }

    clear() {

    }

    insertNode(node) {
        if (!this.root) {
            this.root = node;
            return;
        }
        let place_to_insert = this.root;

        while (true) {
            if (!place_to_insert.left) {
                place_to_insert.left = node;
                break;
            } else if (!place_to_insert.right) {
                place_to_insert.right = node;
                break;
            } else {
                place_to_insert = place_to_insert.left;
            }
        }
        this.parentNodes.push(node);

    }

    shiftNodeUp(node) {

    }

    shiftNodeDown(node) {

    }
}

module.exports = MaxHeap;
