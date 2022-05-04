class CustomArray {
    _length;
    data = [];

    // constructor function
    constructor(length = 0){
        this.#checkLength(length)
        this.data = [];
    }

    static [Symbol.species](){ // returns the constructor 
        return CustomArray;
    }
    
    // getter for length property
    get length(){
        return this._length;
    }

    set length(value){
        throw new Error('Cannot assign length directly')
    }

    #checkLength(value){ // [private function] check Length and create an array [internal usage only] 
        value < 0 ? value = 0: value = value
        this._length = value
    }

    #fixLength(){ // fix length of the Array
        this._length = this.data.length
    }

    pushOne(element){
        if(element){
            this.#fixLength();
            this.data[this._length] = element;
            this._length++;
        }
        return this.data
    }

    //pushMany
    pushMany(...list){  // The rest parameter syntax allows this function to accept an indefinite number of arguments as an array
        this.#fixLength();
        for(let i = 0; i < list.length; i++ ){
            this.data[this._length] = list[i];
            this.#fixLength();
        }
        return this.data;
    }

    //pop
    pop(){
        this.data.length--;
        this.#fixLength();
    }

    static isCustomArray(obj){  // checks if the obj belongs to CustomArray class
        return obj.__proto__ == CustomArray.prototype
    }

    //at
    at(index){
        return this.data[index - 1]; 
    }

    //concat
    concat(customArrayInstance){
        for(let i = 0; i < customArrayInstance.data.length; i++ ){
            this.data[this._length] = customArrayInstance.data[i];
            this.#fixLength();
        }   
    }

    //slice
    slice(start, end = this._length ){ //making end optional
        let slicedArray = new CustomArray();
        for(let i = start; i < end; i++){
            slicedArray.pushOne(this.data[i]) 
        }
        return slicedArray;
    }

    //shift removes the first element of the array
    shift(){
        let removedElement =  this.data[0];
        for(let i = 0; i< this.data.length; i++ ){
            this.data[i] = this.data[i+1];
        }
        this.data.length--;
        this.#fixLength();
        return removedElement
    }

    //reduce
    reduce(){
        
    }

    //find
    find(element){
        try{
            let foundElement;
            for(let i = 0; i< this.data.length; i++){
                this.data[i] == element ? foundElement = this.data[i] : undefined
            }
            if(!foundElement){
                throw new Error('Element Not Found!')
            }
            return true;
        }
        catch(err){
            console.error(err)
        }

    }

    //findIndex
    findIndex(element){
        try{
            let foundIndex;
            for(let i = 0; i< this.data.length; i++){
                this.data[i] == element ? foundIndex = i : undefined
            }
            if(!foundIndex){
                throw new Error('Element Not Found!')
            }
            return foundIndex;
        }
        catch(err){
            console.error(err)
        }
    }

    //unshift The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
    // [10,20,30,1,0,2]  [1,2,3,4]
    // [ , , , , ]
    unshift(...list){
        for(let i = this.data.length; i >= 0; i-- ){
            this.data[i + list.length] = this.data[i];
        }
        for(let j = 0; j < list.length ; j++){
            this.data[j] = list[j];
        }
        this.data.length--; 
        this.#fixLength();
    }

}