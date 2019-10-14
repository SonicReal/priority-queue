const Node = require('./node');

class MaxHeap {

    constructor() {
        this.root = null;
        this.parentNodes = [];
        this.heap = 0;
    }

    push(data, priority) {
        const node = new Node(data, priority)
        this.heap++;
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        return this.detachRoot();
    }

    detachRoot() {
        const root = this.root;
        this.heap--;
        const root_idx = this.parentNodes.indexOf(root);
        if (root_idx >= 0) {
            this.parentNodes.splice(root_idx, 1);
        }
        this.root = this.heap === 0 ? null : this.parentNodes[0];
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {

    }

    size() {
        return this.heap;
    }

    isEmpty() {
        return this.root === null;
    }

    clear() {
        this.root = null;
        this.heap = 0;
        this.parentNodes.length = 0;
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
        } else {
            this.parentNodes[0].appendChild(node);
        }
        if (this.parentNodes.length > 0 && this.parentNodes[0].left && this.parentNodes[0].right) {
            this.parentNodes.splice(0, 1);
        }
        this.parentNodes.push(node);
    }

    shiftNodeUp(node) {
        if (!node.parent) {
            this.root = node;
            return;
        }
        if (node.parent && node.priority > node.parent.priority) {
            const parent_idx = this.parentNodes.indexOf(node.parent);
            const node_idx = this.parentNodes.indexOf(node);
            if (node_idx >= 0) {
                if (parent_idx >= 0) {
                    this.parentNodes[node_idx] = node.parent;
                    this.parentNodes[parent_idx] = node;
                } else {
                    this.parentNodes[node_idx] = node.parent;
                }
            }
            node.swapWithParent();
            this.shiftNodeUp(node);
        }
    }

    shiftNodeDown(node) {
        let biggest_child = node;
        if (node.left && node.left.priority > node.priority) {
            biggest_child = node.left;
        }
        if (node.right && node.right.priority > biggest_child) {
            biggest_child = node.right;
        }
        if (biggest_child === node) {
            return;
        }
        if (this.root === node) {
            this.root = biggest_child;
        }
        const node_idx = this.parentNodes.indexOf(node);
        const biggest_child_idx = this.parentNodes.indexOf(biggest_child);
        if (node_idx >= 0) {
            if (biggest_child_idx >= 0) {
                this.parentNodes[node_idx] = biggest_child_idx;
                this.parentNodes[biggest_child_idx] = node;
            } else {
                this.parentNodes[node_idx] = biggest_child_idx;
            }
        }
        biggest_child.swapWithParent();
        this.shiftNodeDown(node);
    }
}

module.exports = MaxHeap;
