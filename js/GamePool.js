var GameInitData = null;
import { WSEventPool } from './WSEP.js';
export function setGameInitData(data) {
    GameInitData = data;
}
export function ShowGameTable() {
    const main = document.getElementsByTagName('main')[0];
    let localUser = JSON.parse(localStorage.getItem("user"));
    main.innerHTML = 
    `<div class="main__container footer__padding">
        <section class="domino-game-page domino-game-page-classic" id="domino-game-page">
            <div class="domino-games__container">
            <div class="domino-game-page__body-wrapper ddt">
                <div id="TopPan" class="BottomLink">
                <div class="ProfCol">
                    <div class="timer">1:00</div>
                    <div class="prof">
                    <img src="img/avadef.jpeg" style="width:4.1rem; height: 4.1rem; border-radius: 5pt;">
                    <div class="profrows">
                        <span class="Nickname">${localUser.username}</span>
                        <span><span class="turkeyFlag"></span> lvl: 45</span>
                    </div>
                    </div>
                </div>
                <div class="pcontrs">
                    <div class="buttons">
                    <div style="background-image: url('img/flags.png');"></div>
                    <div style="background-image: url('img/volume.png');
                                background-size: 57%;"></div>
                    <div style="background-image: url('img/dice.png');"></div>
                    </div>
                    <div class="line">
                    <div style="flex-grow: 1;"></div>
                    <div style="flex-grow: 3;"></div>
                    </div>
                </div>
                </div>
                <canvas id="canvas"></canvas>
                <script>console.clear()</script>
                <script src="https://cdn.jsdelivr.net/npm/fabric"></script>
                <script src="js/GameLogics.js"></script>
                <script src="js/EntryPoint.js"></script>
                <script src="js/Utilities.js"></script>
                <script src="js/CanvasRender.js"></script>
                <div id="BottomPan" class="TopLink">
                    <div class="pcontrs">
                        <div class="buttons">
                        <div style="background-image: url('img/icons8-smile-chat-100.png');"></div>
                        <div style="background-image: url('img/chat50.png');"></div>
                        </div>
                        <div class="line">
                        <div style="flex-grow: 1;"></div>
                        <div style="flex-grow: 3;"></div>
                        </div>
                    </div>
                    <div class="ProfCol">
                        <div class="timer">1:00</div>
                        <div class="prof">
                        <img src="img/avadef.jpeg" style="width:4.1rem; height: 4.1rem; border-radius: 5pt;">
                        <div class="profrows">
                            <span class="Nickname">???</span>
                            <span><span class="turkeyFlag"></span> lvl: 45</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="rightcol">
                <div class="tabspaces"></div>
                </div>
            </div>
            </div>
        </section>
    </div>`;
    if(!GameInitData) {
        alert('no GameInitData in GamePool.js')
    }
    else InitGame(GameInitData, localUser);
}
let ef = null;
window.addEventListener('DOMContentLoaded', 
    ()=>WSEventPool.on('backgammons::GameStarted', ({players, state})=>ef = {players, state})
);
let ncode = 'np';
const gencode = ()=>ncode = getRandomInt(-65000, 65000);
function InitGame(GameInitData, {userId, username}) {
    const {slots, dropped, players, state} = GameInitData;
    const req = msg=>window.ws.send(JSON.stringify(msg));
    sendstep = async(step)=>req({method:'step', step, code:gencode()});

    const gm = new GameModel(slots, dropped);
    const {GameController} = GameControllerCtxWithGmEntries(gm);
    const gc = new GameController({id:userId, username});
    document.getElementById('TopPan')
                .getElementsByClassName('buttons')[0]
                    .children[0]
                        .addEventListener('click', req.bind(null, {method:'restart'}));
    const canva = new BoardCanvas(
                gm.Slots,
                // range(0,24).map(x=>x!==0?x!==12?[1,1]:[15,2]:[15,1])
                //             .map(([Count, Colour])=>({Count, Colour:Colour!==1?Colour!==2?null:'white':'black'})),
                [0, 0], gc);

    WSEventPool.on('backgammons::GameStarted', ({players, state})=>GameStart(players, state.ActiveTeam, state.Dices))
    if(GameInitData.GameState === 1) GameStart(GameInitData.players, GameInitData.state.ActiveTeam, GameInitData.state.Dices)
    if(ef) GameStart(ef.players, ef.state.ActiveTeam, ef.state.Dices);
    function GameStart([firstPlayer, secondPlayer], ActiveTeam, Dices) {
        // gc.User = secondPlayer;
        gc.start([
                {id:firstPlayer.userId, pteam:firstPlayer.team, team:firstPlayer.team}, 
                {id:secondPlayer.userId, pteam:secondPlayer.team, team:secondPlayer.team}
            ], Dices, ActiveTeam);
        
        canva.createDices(Dices[0], Dices[1], [white, black][ActiveTeam-1]);
        const [whiteplayer, blackplayer] = firstPlayer.team === 1 ? [firstPlayer, secondPlayer] : [secondPlayer, firstPlayer];
        document.getElementById('TopPan')
                .getElementsByClassName('Nickname')[0].innerHTML = whiteplayer.username;
        document.getElementById('BottomPan')
                .getElementsByClassName('Nickname')[0].innerHTML = blackplayer.username;
    }
    WSEventPool.on('step', ({step, prevstate, newstate, code})=>{
        if(code !== ncode) step.map(({from,to})=>{
            gm.Slots[to].add(gm.Slots[from].take(prevstate.ActiveTeam));
            canva.moveChecker(from, to);
        })
        gc._set(newstate.ActiveTeam, newstate.Dices)
        canva.createDices(newstate.Dices[0], newstate.Dices[1], [white, black][newstate.ActiveTeam-1]);
    });
}

// WSEventPool.fon('board').then(
//     event=>{
        // const dropped = [];
        // const {slots} = event;
//         
//         
        // gc._set(event.state.ActiveTeam, event.state.Dices);

//         WSEventPool.on('restart', ()=>window.location.reload());
//         
//         //Tabulations
//         const [mobile, pc] = Array(2).keys();
//         let state = mobile;
//         //initials..
//         const vg = document.getElementsByClassName('domino-game-page__body-wrapper')[0];
//         const TopPan = document.getElementById(`TopPan`);
//         const BottomPan = document.getElementById(`BottomPan`);
//         const righcol = document.getElementsByClassName('rightcol')[0];
//         const ddt = document.getElementsByClassName('ddt')[0];
//         const canvas = document.getElementsByClassName('canvas-container')[0];
//         const space = document.getElementsByClassName('tabspaces')[0];
    
//         function PaginationValidate() {
//             const width = vg.clientWidth;
//             if(width < 950 && state !== mobile) {
//                 state = mobile;
//                 ddt.classList.toggle('horize', state);
//                 ddt.replaceChildren(...[
//                     TopPan, canvas, BottomPan, righcol
//                 ])
//             } else if(width >= 950 && state !== pc) {
//                 state = pc;
//                 ddt.classList.toggle('horize', state);
//                 righcol.replaceChildren(...[
//                     TopPan, space, BottomPan
//                 ])
//             }
//         }
//         PaginationValidate();
//         window.addEventListener('resize', PaginationValidate);
//     }
// );