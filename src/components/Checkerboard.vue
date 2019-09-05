<template>
    <div style="display: flex;height: 500px;">
        <div class="chessboard">
            <template v-for="(children,y) in tableData">
                <div class="chessboard_y" :key="y">
                    <template v-for="(item,x) in children">
                        <div class="chessboard_x" :key="x">
                            <div @click="chessboardClick(item)" class="chess_pieces">
                                <div v-if="item.value=='white'" class="white"></div>
                                <div v-if="item.value=='black'" class="black"></div>
                            </div>
                            <div v-if="y==0" style="position: absolute;top:-35px;left:-5px;font-size:14px;">{{englishLetter(x)}}</div>
                            <div v-if="x==0" style="position: absolute;top:-10px;left:-30px;font-size:14px;">{{y+1}}</div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
        <div style="padding:20px">
            <div>当前：{{current=='white'?'白子':'黑子'}}</div>
            <div style="height:100%;overflow: auto;">
                <div v-for="(item,index) in Record" :key="index">
                    {{item.time}}
                    {{item.value=='white'?'白子':'黑子'}} 
                    {{englishLetter(item.x)+(item.y+1)}} 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:"",
    components: {},
    props: {},
    data() {
        return {
            tableData:[],
            current:'white',
            Record:[],
        };
    },
    computed: {},
    watch: {},
    methods: {
        englishLetter(i){
            return String.fromCharCode(65+i);
        },
        getTime(){
            const time = new Date();
            return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
        },
        init(){
            this.tableData=[];
            for (let y = 0; y < 15; y++) {
                let arr = [];
                for (let x = 0; x < 15; x++) {
                    arr.push({
                        x:x,
                        y:y,
                        value:'',
                    })
                }
                this.tableData.push(arr);
            }
            this.Record=[];
            this.current='white';
        },
        chessboardClick(item){
            console.log('%citem：','color:#468cd4;font-size:12px;',{...item});
            if(!item.value){
                item.value=this.current;
                const el = {
                    ...item,
                    time:this.getTime(),
                    data:this.$lodash.cloneDeep(this.tableData)
                }
                this.Record.unshift(el)
                if(this.determine(el)){
                    alert(`${this.current=='white'?'白子':'黑子'}获得胜利！！！`);
                    this.init();
                }else{
                    this.current=this.current=='white'?'black':'white';
                }
            }
        },
        determine(el){
            let victory = false;
            for (const item of [{x:'-',y:'='},{x:'=',y:'-'},{x:'+',y:'+'},{x:'+',y:'-'}]) {
                if(!victory){
                    let number = 1;
                    let noSkip = true;
                    let num = 1;
                    while(noSkip){
                        const x = el.x + (item.x=='+'?num:item.x=='-'?-num:0);
                        const y = el.y + (item.y=='+'?num:item.y=='-'?-num:0);
                        if(x>=0&&x<=14&&y>=0&&y<=14){
                            if(el.value == el.data[y][x].value){
                                number++;
                                num++;
                            }else{
                                noSkip = false;
                            };
                        }else{
                            noSkip = false;
                        }
                    }
                    noSkip = true;
                    num = 1;
                    while(noSkip){
                        const x = el.x + (item.x=='+'?-num:item.x=='-'?num:0);
                        const y = el.y + (item.y=='+'?-num:item.y=='-'?num:0);
                        if(x>=0&&x<=14&&y>=0&&y<=14){
                            if(el.value == el.data[y][x].value){
                                number++;
                                num++;
                            }else{
                                noSkip = false;
                            };
                        }else{
                            noSkip = false;
                        }
                    }
                    victory = number>=5?true:false;
                }else{
                    break;
                }
            }
            return victory;
        },
    },
    created() {
        this.init();
    },
    mounted() {},
};
</script>

<style lang="less" scoped>
.chessboard{
    display: flex;
    flex-direction: column;
    width: min-content;
    height: min-content;
    border: solid 1px rgba(0, 0, 0, 0.5);
    background-color:#e6a23c;
    padding: 35px;
    overflow: hidden;
    .chessboard_y{
        display: flex;
        width: calc(30px * 15 - 28px);
        height: 2px;
        margin-bottom: 28px;
        background-color: black;
        .chessboard_x{
            width:2px;
            height:30px;
            margin-right: 28px;
            background-color: black;
            position: relative;
            .chess_pieces{
                width: 28px;
                height: 28px;
                border-radius: 50%;
                position: relative;
                left: -13px;
                top: -13px;
                cursor: pointer;
                div{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
                .white{
                    background-color: white;
                }
                .black{
                    background-color: black;
                }
            }
        }
        .chessboard_x:last-child{
            margin-right: 0px;
        }
    }
    .chessboard_y:last-child{
        margin-bottom: 0px;
        .chessboard_x{
            height: 2px;
        }
    }
}
</style>
