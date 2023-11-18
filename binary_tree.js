class node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
        this.next = null;
        this.previous = null;
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
            return ""
        }
        else{
            return this._listPreOrderRecursive(this.root)
        }
    }
    _listPreOrderRecursive(root){
        let res="";
        res=root.value
        if(root.left != null){
            res+=this._listPreOrderRecursive(root.left)
        }
        if (root.right != null){
            res+=this._listPreOrderRecursive(root.right)
        }
        return res; 
    }
    listPostOrder(){
        if(this.root == null){
            return "";
        }
        else{
            return this._listPostOrderRecursive(this.root)
        }
    }
    _listPostOrderRecursive(root){
        let res = "";
        if(root.left != null){
            res += this._listPostOrderRecursive(root.left)
        }
        if (root.right != null){
            res += this._listPostOrderRecursive(root.right)
        }
        return  res;
    }
    makeTree(expression){
        let splitted_expression = expression.split("")
        let listNodes = new doubleLinkedList
        for(let i = 0; i < splitted_expression.length; i++){
            listNodes.add(new node(splitted_expression[i]))
        }
        let aux = listNodes.first;
        while(aux.next != null){
            if (aux.value == '*' || aux.value == '/'){
                aux.left = aux.previous
                aux.right = aux.next
                aux.previous.next = null
                aux.previous = aux.previous.previous
                if(aux.previous!=null){
                    aux.previous.next.previous = null
                    aux.previous.next = aux
                }
                aux.next.previous = null
                aux.next = aux.next.next
                if(aux.next!=null){
                    aux.next.previous.next = null
                    aux.next.previous = aux
                    aux = aux.next
                }
            }
            else{
                aux = aux.next
            }
        }
        while(aux.previous != null){
            aux = aux.previous
        }
        listNodes.first = aux
        while(aux.next != null){
            if (aux.value == '+' || aux.value == '-'){
                aux.left = aux.previous
                aux.right = aux.next
                aux.previous.next = null
                aux.previous = aux.previous.previous
                if(aux.previous!=null){
                    aux.previous.next.previous = null
                    aux.previous.next = aux
                }
                aux.next.previous = null
                aux.next = aux.next.next
                if(aux.next!=null){
                    aux.next.previous.next = null
                    aux.next.previous = aux
                    aux = aux.next
                }
            }
            else{
                aux = aux.next
            }
        }
        this.root = aux
    }
    calculatePreOrder(expression){
        if(this.root == null){
            return 0
        }
        else{
            let splitted_expression = expression.split("")
            let stackNodes = new stack
            for(let i = 0; i < splitted_expression.length; i++){
                stackNodes.add(new node(splitted_expression[i]))
            }
            let operationStack = new stack
            while(stackNodes.last != null){
                let aux = stackNodes.last
                if(aux.value == '*' || aux.value == '/' || aux.value == '+' || aux.value == '-'){
                    let res = 0;
                    let operand1 = operationStack.last;
                    let operand2 = operationStack.last.previous;
                    switch (aux.value) {
                        case '*':
                            res = parseFloat(operand1) * parseFloat(operand2);
                            break;
                        case '/':
                            res = parseFloat(operand1) / parseFloat(operand2);
                            break;
                        case '+':
                            res = parseFloat(operand1) + parseFloat(operand2);
                            break;
                        case '-':
                            res = parseFloat(operand1) - parseFloat(operand2);
                            break;
                    }
                    operationStack.last = operationStack.last.previous.previous
                    operationStack.add(new node(res))
                    stackNodes.last = stackNodes.last.previous
                    if(stackNodes.last.previous == null){
                        return operationStack.last
                    }
                }
                else{
                    operationStack.add(aux)
                    stackNodes.last = stackNodes.last.previous
                }
            }
        }
    }
}

class doubleLinkedList {
    constructor(){
        this.first=null;
      }
        add(newNode){
        if (this.first==null)
          this.first=newNode;
        else{
          let aux=this.first;
            while (aux.next!=null)
            aux=aux.next;
            aux.next=newNode;
            newNode.previous=aux;
        }
      }
      listar(){
        if (this.first==null)
          return "";
        else
          return this._recListar(this.first);
      }
      _recListar(nodo){
        if (nodo.next==null)
          return nodo.value;
        else
          return nodo.value + ' ' + this._recListar(nodo.next);
      }
}

class stack{
    constructor(){
        this.last=null;
      }
    add(newNode){
        if(this.last==null){
            this.last=newNode;
        }
        else{
            let aux=this.last;
            this.last=newNode;
            this.last.previous=aux;
        }
    }
    list(){
        if(this.last==null){
            console.log("")
        }
        else{
            let aux = this.last
            let res = ""
            while(aux != null){
                res += aux.value
                aux = aux.previous
            }
            console.log(res)
        }
    }
}

const expression = "5-2*3+4"
const expression2 = "5-2*3+4/2"
let myTree = new binary_tree();
myTree.makeTree(expression)
let preOrderExpression = myTree.listPreOrder()
console.log(myTree.listPreOrder())
console.log(myTree.calculatePreOrder(preOrderExpression))