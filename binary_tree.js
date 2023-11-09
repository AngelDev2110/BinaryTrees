class node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class binary_tree{
    constructor(){
        this.root = null;
    }
    add(newNode){
        if(this.root == null){
            this.root = newNode;
        }
        else{
            this.addRecursive(this.root, newNode);
        }
    }
    addRecursive(current, newNode){
        if(newNode.value < current.value){
            if(current.left == null){
                current.left = newNode;
            }
            else{
                this.addRecursive(current.left, newNode);
            }
        }
        else{
            if(current.right == null){
                current.right = newNode;
            }
            else{
                this.addRecursive(current.right, newNode);
            }
        }
    }
}

let myTree = new binary_tree();
