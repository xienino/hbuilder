function Game(){
	//定义私有属性
	this.level = 4;
	this.score = 0;
	this.numArr = [];
	this.boxs = $('.game-content div[class^="gr"]');
	this.isEnd=false;
}
Game.prototype = {
	init : function(){
		this.score = 0;
		this.numArr = [];
		this.isEnd=false;
		this.ModelTurnTwo()
		this.RandomPutIn()
		this.RandomPutIn()
		this.ShowNumbers()
		this.ShowScore()
		this.ShowBest()
	},
	ModelTurnTwo : function(){
		for(var r=0; r<this.level; r++){
			var arr = []
			for(var c=0; c<this.level; c++){
				arr.push(0)
			}
			this.numArr.push(arr)
		}
	},
	RandomPutIn : function(){
		var empty = []
		for(var r=0; r<this.level; r++){
			for(var c=0; c<this.level; c++){
				if(this.numArr[r][c]==0){
					empty.push({r:r,c:c})
				}
			}
		}
		if(empty.length){
			var random = Math.floor(Math.random()*empty.length)
			var empty_position = empty[random]
			this.numArr[empty_position.r][empty_position.c]=Math.random()>0.5?2:4
			
		}
	},
	ShowNumbers : function(){
		for(var r=0; r<this.level; r++){
			for(var c=0; c<this.level; c++){
				var box = $( this.boxs[r*this.level+c] )
					box.attr('data-num',this.numArr[r][c]).html(this.numArr[r][c])
				if(this.numArr[r][c]==0){
					box.attr('data-num',this.numArr[r][c]).html('')
				}
			}
		}
	},
	/*-------------------------------------------------------------------------------*/
	SwipeUpAction : function(){
		if(game.isEnd){return ;}
		for(var c=0; c<this.level; c++){
			for(var r=0; r<this.level-1; r++){
				var near_r = this.GetUpNearR(r,c)
				if(near_r==-1){
					break;
				}else{
					//当当前数为0的时候
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[near_r][c]
						this.numArr[near_r][c]=0
						r--;
					}else if(this.numArr[r][c]==this.numArr[near_r][c]){
						this.numArr[r][c]*=2
						this.numArr[near_r][c]=0
						//得分
						this.score+=2
					}
				}
			}
		}
		this.ActionEnd()
	},
	GetUpNearR : function(r,c){
		for(var _r=r+1; _r<this.level; _r++){
			if(this.numArr[_r][c]!=0){
				return _r
			}
		}
		return -1
	},
	/*------------------------------------------------------------------------------------*/
	SwipeDownAction : function(){
		if(game.isEnd){return ;}
		for(var c=0; c<this.level; c++){
			for(var r=this.level-1; r>0; r--){
				var near_r = this.GetDownNearR(r,c)
				if(near_r==-1){
					break;
				}else{
					//当当前数为0的时候
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[near_r][c]
						this.numArr[near_r][c]=0
						r++;
					}else if(this.numArr[r][c]==this.numArr[near_r][c]){
						this.numArr[r][c]*=2
						this.numArr[near_r][c]=0
						//得分
						this.score+=2
					}
				}
			}
		}
		this.ActionEnd()
	},
	GetDownNearR : function(r,c){
		for(var _r=r-1; _r>=0; _r--){
			if(this.numArr[_r][c]!=0){
				return _r
			}
		}
		return -1
	},
	/*----------------------------------------------------------------------------------*/
	SwipeRightAction : function(){
		if(game.isEnd){return ;}
		for(var r=0; r<this.level; r++){
			for(var c=this.level-1; c>0; c--){
				var near_c = this.GetRightNearC(r,c)
				if(near_c==-1){
					break;
				}else{
					//当当前数为0的时候
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[r][near_c]
						this.numArr[r][near_c]=0
						c++;
					}else if(this.numArr[r][c]==this.numArr[r][near_c]){
						this.numArr[r][c]*=2
						this.numArr[r][near_c]=0
						//得分
						this.score+=2
					}
				}
			}
		}
		this.ActionEnd()
	},
	GetRightNearC : function(r,c){
		for(var _c=c-1; _c>=0; _c--){
			if(this.numArr[r][_c]!=0){
				return _c
			}
		}
		return -1
	},
	/*----------------------------------------------------------------------------------*/
	SwipeLeftAction : function(){
		if(game.isEnd){return ;}
		for(var r=0; r<this.level; r++){
			for(var c=0; c<this.level-1; c++){
				var near_c = this.GetLeftNearC(r,c)
				if(near_c==-1){
					break;
				}else{
					//当当前数为0的时候
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[r][near_c]
						this.numArr[r][near_c]=0
						c--;
					}else if(this.numArr[r][c]==this.numArr[r][near_c]){
						this.numArr[r][c]*=2
						this.numArr[r][near_c]=0
						//得分
						this.score+=2
					}
				}
			}
		}
		this.ActionEnd()
	},
	GetLeftNearC : function(r,c){
		for(var _c=c+1; _c<this.level; _c++){
			if(this.numArr[r][_c]!=0){
				return _c
			}
		}
		return -1
	},
	/*------------------------------------------------------------------------------------*/
	ActionEnd : function(){
		this.RandomPutIn()
		this.ShowNumbers()
		console.log(this.numArr)
		this.ShowScore()//+分
		
		if(this.IsWin()){
			$(".alert-box").removeClass("mui-hidden").find("h3").html("YOU WIN!")
			this.isEnd=true;
		}else if(this.IsLose()){
			$(".alert-box").removeClass("mui-hidden").find("h3").html("YOU LOSE!")
			this.isEnd=true;
		}
	},
	ShowScore:function(){//显示当前分数
		$("#now").html(this.score)
	},
	IsWin:function(){//判断是否赢了（是否出现2048）
		for (var r = 0;r<this.level;r++) {
			for (var c = 0;c<this.level;c++) {
				if(this.numArr[r][c]==16){
					return true
				}
			}
		}
		return false
	},
	IsLose : function(){
		for (var r = 0;r<this.level;r++) {
			for (var c = 0;c<this.level;c++) {
				if(this.numArr[r][c]==0){
					return false;
				}
				if(r<this.level-1&&this.numArr[r][c]==this.numArr[r+1][c]){return false;}
				if(c<this.level-1&&this.numArr[r][c]==this.numArr[r][c+1]){return false;}
			}
		}
		return true;
	},
	Restart : function(){
		$(".alert-box").addClass('mui-hidden')
		this.SaveScore()
		this.init()
	},
	SaveScore : function(){
//		alert(1)
		var scores = localStorage.scores?JSON.parse(localStorage.scores):[]
		scores.push({
			score:this.score,
			time:this.FormatTime()
		})
		localStorage.scores = JSON.stringify(scores)
	},
	FormatTime : function(){
		var date = new Date()
		var y = date.getFullYear()
		var m = date.getMonth()+1
		var d = date.getDate()
		return y+'-'+m+'-'+d
	},
	ShowBest : function(){
		var scores = localStorage.scores?JSON.parse(localStorage.scores):[]
		var best = 0
		if(scores.length){
			scores.sort(function(a,b){
				return b.score-a.score
			})
			best = scores[0].score
		}
		alert('执行到showbest了！')
		$('#best').html('a')
	}
}

var game = new Game()
game.init()
window.addEventListener('swipeup',function(){
	game.SwipeUpAction()
})
window.addEventListener('swipedown',function(){
	game.SwipeDownAction()
})
window.addEventListener('swiperight',function(){
	game.SwipeRightAction()
})
window.addEventListener('swipeleft',function(){
	game.SwipeLeftAction()
})
$('#restart').on('tap',function(){
	game.Restart()
})
