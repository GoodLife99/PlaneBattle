"use strict";

var PlaneBattle = function(){
	LocalContractStorage.defineMapProperty(this, "dataMap");
	LocalContractStorage.defineMapProperty(this, "iteratorMap");
	LocalContractStorage.defineProperty(this, "size");
};

PlaneBattle.prototype = {
	
init: function(){
	this.size = 0;
},

save: function(score){
	var from = Blockchain.transaction.from;
	var existingObj = this.dataMap.get(from);
	var existingScore = null;
	if(existingObj != null){
		existingScore = JSON.parse(existingObj).score;
	}
	
	
	var firstTime = false;
	var higherScore = false;
	
	if(existingScore == null){
		firstTime = true;
	}else{
		if(existingScore < score){
			higherScore = true;
		}		
	}
	
	if(firstTime){//第一次保存
		var obj = new Object();
		obj.address = from;
		obj.score = score;
		this.dataMap.set(from, JSON.stringify(obj));	
		this.iteratorMap.set(this.size, from);	
		this.size += 1;
	}
	
	if(higherScore){//有更高的成绩
		var obj = new Object();
		obj.address = from;
		obj.score = score;
		this.dataMap.set(from, JSON.stringify(obj));	
	}
	
},


getAll: function(){
		var result = [];
        for(var i=0;i<this.size;i++){
			//现根据i取出地址，然后再根据地址取出分数
            result.push(this.dataMap.get(this.iteratorMap.get(i)));
        }
        return result;
    }

};

module.exports = PlaneBattle;
