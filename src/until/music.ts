import Sound from 'react-native-sound';
import store from '../store';
import { GlobalState } from '../reducers';
const src = require('../resource/music/music.mp3')
const smgameover = require('../resource/music/sm_gameover.mp3')
const smbg = require('../resource/music/sm_bg.mp3')
class MusicManager {
    private timeInterval = 0
    private sound: Sound
    private superMarioGameOverSound: Sound
    private superMarioBgm: Sound    
    constructor() {
        this.sound = new Sound(src, (error) => {
            if (error) {
                return console.log('资源加载失败', error);
            }
        })
        this.superMarioGameOverSound  = new Sound(smgameover, (error) => {
            if (error) {
                return console.log('资源加载失败', error);
            }
            this.superMarioGameOverSound.setSpeed(1.5)
        })        
        this.superMarioBgm  = new Sound(smbg, (error) => {
            if (error) {
                return console.log('资源加载失败', error);
            }
            this.superMarioBgm.setVolume(0.5);
        })                        
    }

    //关闭音效
    off = () => {
        this.allStop()
        if (this.timeInterval) {
            clearTimeout(this.timeInterval)
            this.timeInterval = 0
        }
    }

    //bgm
     bgm = () => {        
        this.play(0, 500, this.superMarioBgm)                  
     }

     bgmStop = () => {
         this.superMarioBgm.stop()
     }

    //游戏开始
    start = () => {
        this.play(3.7202, 3.6224)                 
    }

    //消除方块
    clear = () => {
        this.play(0, 0.7675)        
    }

    //立即下落
    drop = () => {
        this.play(1.2558, 0.3546)
    }

    //游戏结束
    gameOver = () => {
        // this.play(8.1276, 1.1437)
        this.play(0, 500, this.superMarioGameOverSound)
    }

    //旋转
    rotate = () => {
        this.play(2.9088, 0.3437)
    }

    //移动
    move = () => {
        this.play(2.9088, 0.3437)
    }

    ///通用播放指定时段的方法,单位为秒，可以为小数
    private play = (begin: number, length: number, sourceSound: Sound = this.sound) => {                
        let sound = sourceSound!
        //加载中的
        if (!sound.isLoaded) {
            return;
        }

        this.allStop()

        if (this.timeInterval) {
            clearTimeout(this.timeInterval)
            this.timeInterval = 0
        }

        if (this.sound.isPlaying) {
            this.sound.stop()
        }

        //如果当前状态为禁音，则忽略
        let state = store.getState() as any as GlobalState
        let music = state.get('music')
        if (!music) {
            return;            
        }

        sound.setCurrentTime(begin)        
        sound.play()
        this.timeInterval = setTimeout(() => {
            sound.stop();
            clearTimeout(this.timeInterval)
            this.timeInterval = 0
        }, length * 1000);
    }

    private allStop = () => {
        this.sound.stop()
        this.superMarioGameOverSound.stop()
        this.superMarioBgm.stop()        
    }
}

const manager = new MusicManager()
export default manager;