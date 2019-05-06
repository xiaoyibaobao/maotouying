const ADD_ITEMNUM = 'ADD_ITEMNUM'
const REMBER_ANSWER = 'REMBER_ANSWER'
const REMBER_TIME = 'REMBER_TIME'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const SETSTEP = 'SETSTEP'
const SETSTEPSTATUS = 'SETSTEPSTATUS'
const SetPlaceInfo = 'SetPlaceInfo'
const SetActId = 'SetActId'
const SetActType = 'SetActType'
const SetActStatus = 'SetActStatus'

export default {
  //点击进入下一题
  [ADD_ITEMNUM](state, num) {
    state.itemNum += num;
  },
  //记录答案
  [REMBER_ANSWER](state, id) {
    state.answerid.push(id);
  },
  /*
    记录做题时间
     */
  [REMBER_TIME](state) {
    state.timer = setInterval(() => {
      state.allTime++;
    }, 1000)
  },
  /*
    初始化信息，
     */
  [INITIALIZE_DATA](state) {
    state.itemNum = 1;
    state.allTime = 0;
    state.answerid = [];
  },
  /*
    setStepNum，
     */
  [SETSTEP](state, step) {
    state.step = +step;
    /*if(step == '+'){
      state.step++;
    }else if(step == '-'){
      state.step--;
    }else{
      state.step = step;
    }

    let preStep, nextStep, publish;
    switch(step){
      case 1 :
        state.preStep = false;
        state.nextStep = true;
        state.publish = false;
        break;
      case 2 :
        state.preStep = true;
        state.nextStep = true;
        state.publish = false;
        break;
      case 3 :
        state.preStep = true;
        state.nextStep = false;
        state.publish = true;
        break;
    }*/

  },
  /*
    setStepStatus，
     */
  [SETSTEPSTATUS](state) {
    for(var i in obj){
      if(state[i]!=null){
        state[i] = obj[i];
      }
    }
  },

  [SetPlaceInfo](state, aActPlace){
    state.aActPlace = aActPlace;
  },

  [SetActId](state, actIdx){
    state.actIdx = actIdx;
  },

  [SetActType](state, actTypex){
    state.actTypex = actTypex;
  },

  [SetActStatus](state, actStatusx){
    state.actStatusx = actStatusx;
  },







}
