const btnNormalExpression = document.getElementById('btnNormalExpression');
btnNormalExpression.addEventListener('click', () => {
        let expresion = String(document.getElementById('normalExpression').value);
        let divRes=document.getElementById('divRes');
        let myTree = new binary_tree;
        myTree.makeTree(expresion);
        divRes.innerHTML=`<h4>Expresión preOrden:</h4><p>${myTree.listPreOrder()}</p><h4>Expresión postOrden: </h4><p>${myTree.listPostOrder()}</p><h4>Resultado: </h4><p>${myTree.calculatePreOrder(myTree.listPreOrder())}</p>`;
    });

const btnLimpiar = document.getElementById('btnLimpiar');
btnLimpiar.addEventListener('click', () => {
    document.getElementById('normalExpression').value="";
    document.getElementById('preOrderExpression').value="";
    document.getElementById('postOrderExpression').value="";
    document.getElementById('divRes').innerHTML="";
});

const btnPreOrder = document.getElementById('btnPreOrderExpression');
btnPreOrder.addEventListener('click', () => {
    let expresion = String(document.getElementById('preOrderExpression').value);
    let divRes=document.getElementById('divRes');
    let myTree = new binary_tree;
    divRes.innerHTML=`<h4>Resultado de tu preOrden: </h4><p>${myTree.calculatePreOrder(expresion)}</p>`;
});

const btnPostOrder = document.getElementById('btnPostOrderExpression');
btnPostOrder.addEventListener('click', () => {
    let expresion = String(document.getElementById('postOrderExpression').value);
    let divRes=document.getElementById('divRes');
    let myTree = new binary_tree;
    divRes.innerHTML=`<h4>Resultado de tu postOrden: </h4><p>${myTree.calculatePostOrder(expresion)}</p>`;
});
    
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
        res+=root.value
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
        let exp1 = expression.split("")
        let exp2 = []
        for(let i = exp1.length-1; i >= 0; i--){
            switch(exp1[i]){
                case '*':
                    exp2.push(parseFloat(exp2.pop())*parseFloat(exp2.pop()))
                    break;
                case '/':
                    exp2.push(parseFloat(exp2.pop())/parseFloat(exp2.pop()))
                    break;
                case '+':
                    exp2.push(parseFloat(exp2.pop()) + parseFloat(exp2.pop()))
                    break;
                case '-':
                    exp2.push(parseFloat(exp2.pop())-parseFloat(exp2.pop()))
                    break;
                default:
                        exp2.push(exp1[i])
                    break;
                }
        }
        return exp2.pop()
    }
    
    calculatePostOrder(expression){
        let exp1 = expression.split("")
        let exp2 = []
        let aux1 = 0
        let aux2 = 0
        for(let i = 0; i < exp1.length; i++){
            if(exp1[i] == '*' || exp1[i] == '/' || exp1[i] == '+' || exp1[i] == '-'){
                aux2 = parseFloat(exp2.pop())
                aux1 = parseFloat(exp2.pop())
            }
            switch(exp1[i]){
                case '*':
                    exp2.push((aux1) * (aux2))
                    break;
                case '/':
                    exp2.push((aux1) / (aux2))
                    break;
                case '+':
                    exp2.push((aux1) +  (aux2))
                    break;
                case '-':
                    exp2.push((aux1) - (aux2))
                    break;
                default:
                        exp2.push(exp1[i])
                    break;
                }
        }
        return exp2.pop()
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







// //node examples
// //expression examples
// const expression = "5-2*3+4"
// const expression2 = "5-2*3+5/2"

// //tree declaration
// let myTree = new binary_tree();
// myTree.makeTree(expression2)

// //tree methods "preorder"{
// console.log("PREORDER")
// let preOrderExpression = myTree.listPreOrder()
// console.log(myTree.listPreOrder())
// console.log(myTree.calculatePreOrder(preOrderExpression))
// console.log("PREORDER\n")
// //tree methods "postorder"
// console.log("POSTORDER")
// let postOrderExpression = myTree.listPostOrder()
// console.log(myTree.listPostOrder())
// console.log(myTree.calculatePostOrder(postOrderExpression))
// console.log("POSTORDER\n")