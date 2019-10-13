class Node {
    constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    appendChild(node) {
        if (!this.left) {
            this.left = node;
            node.parent = this;
        } else if (!this.right) {
            this.right = node;
            node.parent = this;
        }
    }

    removeChild(node) {
        if (this.left === node) {
            node.parent = null;
            this.left = null;
        } else if (this.right === node) {
            node.parent = null;
            this.right = null;
        } else {
            throw '(╯°□°）╯︵ ┻━┻';
        }
    }

    remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }

    swapWithParent() {
        if (!this.parent) {
            return;
        }
        const my_new_child = this.parent;

        const his_left = this.parent.left;
        const his_right = this.parent.right;
        const his_parent = this.parent.parent;

        const my_left = this.left;
        const my_right = this.right;

        my_new_child.left = my_left;
        my_new_child.right = my_right;

        if (my_left) {
            my_left.parent = my_new_child;
        }
        if (my_right) {
            my_right.parent = my_new_child;
        }

        my_new_child.parent = this;

        this.parent = his_parent;
        if (his_left === this) {
            this.left = my_new_child;
            this.right = his_right;
            if (this.right) {
                this.right.parent = this;
            }
        } else if (his_right === this) {
            this.right = my_new_child;
            this.left = his_left;
            if (this.left) {
                this.left.parent = this;
            }
        }

        if (his_parent) {
            if (his_parent.left === my_new_child) {
                his_parent.left = this;
            } else if (his_parent.right === my_new_child) {
                his_parent.right = this;
            }
        }
    }
}

module.exports = Node;
