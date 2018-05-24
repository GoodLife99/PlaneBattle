var dappAddress = "n1oJ2GCJyw19xkENRWMDia4344qiSNT6V1m";

$(function() {
	load();
});

 function load(){
	
	var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();
	
	    var to = dappAddress;
        var value = "0";
        var callFunction = "getAll";
        var callArgs = "";

				nebpay.simulateCall(to, value, callFunction, callArgs, {
					listener: function(resp) {
						var result = JSON.parse(resp.result);
						sortarr(result);
						var str="";
						for(var i =0; i< result.length; i++){
							var obj = JSON.parse(result[i]);
							str += '<tr> ';
							str += '<td class="body-item mbr-fonts-style display-7">';
							str += i+1;
							str += '</td><td class="body-item mbr-fonts-style display-7">';
							str += obj.address;
							str += '</td><td class="body-item mbr-fonts-style display-7">';
							str += obj.score;
							str += '</td></tr>';						
							
						}
						
						$("#rankresult").html(str);
						
					}
				});

	 
 };
 
 function sortarr(arr){
    for(i=0;i<arr.length-1;i++){
        for(j=0;j<arr.length-1-i;j++){
            if(arr[j]>arr[j+1]){
                var temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;
            }
        }
    }
    return arr;
};

