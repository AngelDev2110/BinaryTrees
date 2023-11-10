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
            this._addRecursive(this.root, newNode);
        }
    }
    _addRecursive(current, newNode){
        if(newNode.value < current.value){
            if(current.left == null){
                current.left = newNode;
            }
            else{
                this._addRecursive(current.left, newNode);
            }
        }
        else{
            if(current.right == null){
                current.right = newNode;
            }
            else{
                this._addRecursive(current.right, newNode);
            }
        }
    }
    search(nodeNum){
        if(this.root == null){
            return null;
        }
        else{
            return this._searchRecursive(this.root, nodeNum);
        }
    }
    _searchRecursive(current, nodeNum){
        if(current == null){
            return null
        }
        if(nodeNum == current.value){
            return current
        }
        if(nodeNum < current.value){
            return this._searchRecursive(current.left, nodeNum);
        }
        else{
            return this._searchRecursive(current.right, nodeNum);
        }
    }
    listInOrder(){
        if(this.root == null){
            console.log("")
        }
        else{
            this._listInOrderRecursive(this.root)
        }
    }
    _listInOrderRecursive(root){
        if(root.left != null){
            this._listInOrderRecursive(root.left)
        }
            console.log(root.value)
        if (root.right != null){
            this._listInOrderRecursive(root.right)
        }
    }
    listPreOrder(){
        if(this.root == null){
            console.log("")
        }
        else{
            this._listPreOrderRecursive(this.root)
        }
    }
    _listPreOrderRecursive(root){
        console.log(root.value)
        if(root.left != null){
            this._listPreOrderRecursive(root.left)
        }
        if (root.right != null){
            this._listPreOrderRecursive(root.right)
        }
    }
    listPostOrder(){
        if(this.root == null){
            console.log("")
        }
        else{
            this._listPostOrderRecursive(this.root)
        }
    }
    _listPostOrderRecursive(root){
        if(root.left != null){
            this._listPostOrderRecursive(root.left)
        }
        if (root.right != null){
            this._listPostOrderRecursive(root.right)
        }
        console.log(root.value)
    }
}

let myTree = new binary_tree();
let newNode = new node(3);
myTree.add(newNode);
newNode = new node(5);
myTree.add(newNode);
newNode = new node(9);
myTree.add(newNode);
newNode = new node(15);
myTree.add(newNode);
newNode = new node(2);
myTree.add(newNode);
newNode = new node(1);
myTree.add(newNode);
console.log(myTree.search(2));
console.log(myTree.search(3));
console.log(myTree.search(15));
console.log(myTree.search(7));
myTree.listInOrder()
myTree.listPreOrder()
myTree.listPostOrder()