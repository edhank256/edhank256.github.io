

function fight(rate){
	if(rate>Math.random()*100){
		return 'victory';
	}
	else return 'defeat';
}


function ranking(startPip,goalPip,rate,show){
	var games=0;
	var pip=startPip;
	var wins=0;
	//stat=1:連勝1場中   stat=2:連勝2場    stat=-1:連敗1場 以此類推
	var stat=0;
	var result;
	document.getElementById('result').innerHTML="";
	while(pip<goalPip&&games<9999){
		//總之打一場
		result=fight(rate);
		//如果贏的話
		if('victory'==result){
			wins++;
			//已經連勝兩場以上，或三連敗以上的話
			if(stat>=2||stat<=-3){
				pip=pip+2;
			}
			else{
				pip++;
			}
			//改變連勝連敗狀態
			if(stat>=0){
				stat++;
			}
			else{
				stat=1;
			}
			if(show==1){
				document.getElementById('result').innerHTML=document.getElementById('result').innerHTML+"Victory　　　　"+pip+"pips<br>";
			}
		}
		//如果輸的話
		else{
			//如果在存檔點上就不扣分
			//0~15黃寶  19 23 27 31綠寶  35 40 45 50 55藍寶  60上紅寶 90上鑽  125上傳奇
			if(0<=pip&&pip<=15){
			}
	 		else if(pip==19||pip==23||pip==27||pip==31||pip==35||pip==40||pip==45||pip==50||pip==55||pip==60||pip==90||pip==125){
			}
			else if(pip>=125&&(pip-125)%25==0){
			}
			else{
				pip--;
			}
			//改變連勝狀態
			if(stat>=0){
				stat=-1
			}
			else{
				stat--;
			}
			if(show==1){
				document.getElementById('result').innerHTML=document.getElementById('result').innerHTML+"Defeat　　　　"+pip+"pips<br>";
			}
		}
		//不管打贏打輸你都多浪費了人生可悲的15分鐘 哭哭
		games++;
	}
	return [games,wins];
}

function tenThousandTest(startPip,goalPip,rate){
	var sum=0;
	var max=-1;
	var min=9999999999999999;
	var result;
	for(i=0;i<=9999;i++){
		result=ranking(startPip,goalPip,rate,0)[0];
		if(result>max){
			max=result;
		}
		if(result<min){
			min=result;
		}
		sum=sum+result;
	}
	return [sum/10000,max,min];
}

function actualTenThousandTest(startPip,goalPip,rate){
	var sum=0;
	var max=-1;
	var min=9999999999999999;
	var result;
	var actualPpl=0;
	for(i=0;i<=9999;i++){
		testResult=ranking(startPip,goalPip,rate,0);
		result=testResult[0];
		if((testResult[1]*100/testResult[0])<=(rate+0.5)&&(testResult[1]*100/testResult[0])>=(rate-0.5)){
			if(result>max){
				max=result;
			}
			if(result<min){
				min=result;
			}
			sum=sum+result;
			actualPpl++;
		}
	}
	return [sum/actualPpl,max,min,actualPpl];
}


function test(){
	var startPip=parseInt(document.getElementById("currentPip").value);
	var goalPip=parseInt(document.getElementById("goalPip").value);
	var rate=parseFloat(document.getElementById("rate").value);
	var result=tenThousandTest(startPip,goalPip,rate);
	document.getElementById('result').innerHTML="萬人均場次:"+result[0]+"<br>最慘非洲人打了:"+result[1]+"場<br>最神歐洲人打了:"+result[2]+"場";
}

function actualTest(){
	var startPip=parseInt(document.getElementById("currentPip").value);
	var goalPip=parseInt(document.getElementById("goalPip").value);
	var rate=parseFloat(document.getElementById("rate").value);
	var result=actualTenThousandTest(startPip,goalPip,rate);
	document.getElementById('result').innerHTML="萬人均場次:"+result[0]+"<br>最慘非洲人打了:"+result[1]+"場<br>最神歐洲人打了:"+result[2]+"場<br>共有:"+result[3]+"人的最終勝率在"+rate+"+-0.5%之間<br>精準測試僅計算這些人的場次數";
}

function singleTest(){
	var startPip=parseInt(document.getElementById("currentPip").value);
	var goalPip=parseInt(document.getElementById("goalPip").value);
	var rate=parseFloat(document.getElementById("rate").value);
	var result=ranking(startPip,goalPip,rate,1);
	document.getElementById('result').innerHTML="共計:"+result[0]+"場<br>"+document.getElementById('result').innerHTML;
}