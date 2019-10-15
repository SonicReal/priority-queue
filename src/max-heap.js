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

        const root = this.detachRoot();
        const new_root = this.restoreRootFromLastInsertedNode(root);
        if (new_root) {
            this.shiftNodeDown(new_root);
        }
        return root ? root.data : null;
    }

    detachRoot() {
        const root = this.root;
        const root_idx = this.parentNodes.indexOf(root)
        if (root_idx >= 0) {
            this.parentNodes.splice(root_idx, 1);
        }
        this.root = null;
        this.heap--;
        return root;
    }

    restoreRootFromLastInsertedNode(detached) {
        const new_root = this.parentNodes.pop();
        if (!new_root) {
            return;
        }
        if (new_root.parent) {
            if (new_root.parent === detached) {

            } else if (this.parentNodes.indexOf(new_root.parent) < 0) {
                this.parentNodes.unshift(new_root.parent);
            }
        }
        new_root.remove();
        new_root.left = detached.left;
        if (detached.left) {
            detached.left.parent = new_root;
        }
        new_root.right = detached.right;
        if (detached.right) {
            detached.right.parent = new_root;
        }

        this.root = new_root;
        if (!new_root.right || !new_root.left) {
            this.parentNodes.unshift(new_root);
        }
        return new_root;
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
        if (node.right && node.right.priority > biggest_child.priority) {
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
                this.parentNodes[node_idx] = biggest_child;
                this.parentNodes[biggest_child_idx] = node;
            } else {
                this.parentNodes[node_idx] = biggest_child;
            }
        } else {
            if (biggest_child_idx >= 0) {
                this.parentNodes[biggest_child_idx] = node;
            }
        }

        biggest_child.swapWithParent();

        this.shiftNodeDown(node);
    }
}

module.exports = MaxHeap;
