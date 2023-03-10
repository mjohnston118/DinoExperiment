    /*************** STIMULI ***************/


     const instruction = {
        type: "instructions",
        pages: [
            `<h1>${language.welcomePage.welcome}</h1></p>${language.welcomePage.clickNext}</p>`,
            `<p>${language.instruction.fourCircles}</p>
            <p>${language.instruction.dog}</p>
            <p>${language.instruction.yourTask}
            <div class='float: center;'>${language.instruction.img}</div>
            <p>${language.instruction.restBetweenBlocks}
            <audio src = "../static/sound/dance.wav" autoplay>`, // I added this line to get dogBarking sound when showing dog image
            `<p>${language.instruction2.firstButton}</p>
            <p>${language.instruction2.secondButton}</p>
            <p>${language.instruction2.thirdButton}</p>
            <p>${language.instruction2.fourthButton}</p>
            <div class='float: center;'><img src='../static/images/keyboard.bmp' height='10%' alt='Hand'/></div>
            <p>${language.instruction2.ifClear}
            <audio src = "../static/sound/dogBarking.wav" autoplay>`,
            `<h2>${language.instruction3.fastAndAccurate}</h2>
            <p>${language.instruction3.starsTwo}</p>
            <img src="../static/images/bothStars.png" height='8%'
            <audio src = "../static/sound/2ding.wav" autoplay>`,
            
            `<h2>${language.instruction4.error}</h2>
            <p>${language.instruction4.remind}
            <audio src = "../static/sound/buzz.wav" autoplay>`,


            
        ],
        show_clickable_nav: true,
        button_label_next: `${language.button.next}`,
        button_label_previous: `${language.button.previous}`
    }

    const startPracticeInstruction = {
        type: "html-keyboard-response",
        stimulus: 
            `<h2>${language.practice.practiceSoon}</h2>
            <p>${language.task.place}</p>
            <img src="../static/images/keyboard.bmp" height='10%'>
            <p><strong>${language.practice.startPractice}</strong></p>`
    };

    const blockStart = {
        type: "html-keyboard-response",
        stimulus: `
        <h2>${language.task.nextBlockSoon}</h2>
        <p>${language.task.place}</p>
        <img src="../static/images/keyboard.bmp" height='10%'>
        <p><strong>${language.task.nextBlock}</strong></p>`
    };


    const startInstruction = {
        type: "html-keyboard-response",
        stimulus: 
            `<h2>${language.task.realTask}</h2>
            <p>${language.task.place}</p>
            <img src="../static/images/keyboard.bmp" height='10%'>
            <p>${language.task.startTask}</p>`
    };

    const end = {
        type: "html-keyboard-response",
        stimulus: `<h2>${language.end.endTask}</p><p>${language.end.thankYou}</h2>`
    };

    const feedback = {
        type: "html-keyboard-response",
        trial_duration: 5000,
        response_ends_trial: false,
        stimulus: function () {
            let trials = jsPsych.data.get();
            let blockNum = jsPsych.data.get().last(1).values()[0].block;
            let correct_trials = trials.filter({correct: true, block: blockNum, first_response: 1});
            let numberOfTrials = trials.filter({block: blockNum, first_response: 1}).count();
            let accuracy = Math.round(correct_trials.count() / numberOfTrials * 100);
            let rt = Math.round(correct_trials.select('rt').mean());
            let message;
            if (accuracy < 90) {
                message = `<img src="../static/images/noFastOrCorrect.png" height='10%'>`
            } else if (accuracy >= 90 && rt > 350) {
                message = `<img src="../static/images/justCorrect.png" height='10%'>
                           <audio src = "../static/sound/ding.wav" autoplay>`
            } else {
                message = `<img src="../static/images/fastAndCorrect.png" height='10%'>
                           <audio src = "../static/sound/2ding.wav" autoplay>`
            }
            return `<h2>${language.feedback.endBlock}${blockNum}</h2><br><p>${language.feedback.yourAccuracy}${accuracy}%</p><p>${language.feedback.yourRt}${rt} ms</p><br>${message}`
        }
    }

    const warningStimulus = {
        type: "html-keyboard-response",
        response_ends_trial: true,
        data: {is_warning: "warning"},
        stimulus: function () {
            let trials = jsPsych.data.get().filter({trial_type: "serial-reaction-time"});
            let correctTrials = trials.filter({correct: true, first_response: 1});
            let numberOfTrials = trials.filter({first_response: 1}).count();
            let allAccuracy = Math.round(correctTrials.count() / numberOfTrials * 100);
            return `<h2 class="warning">${language.warning.warning}</h2>
                <p>${language.warning.accuracy}</p><p style="color:red; font-size:50px">${allAccuracy}%</p>
                <p><strong>${language.warning.onlyValid}</strong></p>
                <p><strong>${language.warning.moreAccurate}</strong></p><br>
                <p>${language.warning.pressButton}</p>`
        },
    }

    const warning = {
        timeline: [warningStimulus],
        timeline_variables: warningStimulus.data,
        conditional_function: function() {
            let trial = jsPsych.data.get().filter({trial_type: "serial-reaction-time"});
            let correctTrials = trial.filter({correct: true, first_response: 1});
            let numberOfTrials = trial.filter({first_response: 1}).count();
            let allAccuracy = Math.round(correctTrials.count() / numberOfTrials * 100);
            return allAccuracy < 80;
        }
    }
    
    // New instruction to show before second image
    
    const secondImageInstruction = {
      type: "instructions",
      pages:[
        `<h2>${language.secondimageinstructions.endOfFirstHalf}</h2>
        <p>${language.secondimageinstructions.endOfFirstHalf2}</p>`,
        `<h2>${language.secondimageinstructions.newTask1}</h2>
        <p>${language.secondimageinstructions.newTask2}</p>
        <img src="../static/images/ASRT_en2.gif" width='60%'>
         <p>${language.secondimageinstructions.newTask3}</p>
        <p>${language.secondimageinstructions.newTask4}
        <audio src = "../static/sound/penguinSound.wav" autoplay>`
      ],
      
      show_clickable_nav: true,
      button_label_next: `${language.button.next}`,
      button_label_previous: `${language.button.previous}`
    };

    /* set up trial properties */

    const trialProperties = {
        type: "serial-reaction-time",
        grid: [[1, 1, 1, 1]],
        choices: responseKeys,
        target: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        response_ends_trial: true,
    }




// Images (changed to lets so they can be altered)
  let patternTrialProperties = {... trialProperties, pre_target_duration: rsi, target_color: patternTrialImage};
    let patternTrialPropertiesTwo = {... trialProperties, pre_target_duration: rsi, target_color: secondTrialImage};
    let patternIncorrectTrialProperties = {... trialProperties, pre_target_duration: 0, target_color: patternTrialImage};
    let patternIncorrectTrialPropertiesTwo = {... trialProperties, pre_target_duration: 0, target_color: secondTrialImage};
    let randomTrialProperties = {... trialProperties, pre_target_duration: rsi, target_color: randomTrialImage};
    let randomIncorrectTrialProperties = {... trialProperties, pre_target_duration: 0, target_color: randomTrialImage};
    let firstTrialProperties = {... trialProperties, pre_target_duration: initialDelay, target_color: randomTrialImage};
    let secondTrialProperties = {... trialProperties, pre_target_duration: rsi, target_color: secondTrialImage}; //set this to have rsi, it effectively replaces random trial properties I think..
    let secondTrialWithDelayProperties = {... trialProperties, pre_target_duration: initialDelay, target_color: secondTrialImage}; //needed to replace first trial props...
    let secondRandomIncorrectTrialProperties = {... trialProperties, pre_target_duration: 0, target_color: secondTrialImage};



// Function switching images around depending on ID
// unsure if subject_id is the correct variable 
// Won't run as is
/*
if(variables.subject_id % 2 == 0) {
    // console.log("The number is even.");
    orderImage = 1;
}

// if the number is odd
else {
    //console.log("The number is odd.");
   orderImage = 0;
}

if (orderImage == 1) {
  return {
    patternTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: patternTrialImage},
    patternTrialPropertiesTwo: {...trialProperties, pre_target_duration: rsi, target_color: secondTrialImage},
    patternIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: patternTrialImage},
    patternIncorrectTrialPropertiesTwo: {...trialProperties, pre_target_duration: 0, target_color: secondTrialImage},
    randomTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: randomTrialImage},
    randomIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: randomTrialImage},
    firstTrialProperties: {...trialProperties, pre_target_duration: initialDelay, target_color: randomTrialImage},
    secondTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: secondTrialImage},
    secondTrialWithDelayProperties: {...trialProperties, pre_target_duration: initialDelay, target_color: secondTrialImage},
    secondRandomIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: secondTrialImage}
  };
} else {
  return {
    patternTrialPropertiesTwo: {...trialProperties, pre_target_duration: rsi, target_color: patternTrialImage},
    patternTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: secondTrialImage},
    patternIncorrectTrialPropertiesTwo: {...trialProperties, pre_target_duration: 0, target_color: patternTrialImage},
    patternIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: secondTrialImage},
    randomTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: secondTrialImage},
    randomIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: secondTrialImage},
    firstTrialProperties: {...trialProperties, pre_target_duration: initialDelay, target_color: secondTrialImage},
    secondTrialProperties: {...trialProperties, pre_target_duration: rsi, target_color: randomTrialImage},
    secondTrialWithDelayProperties: {...trialProperties, pre_target_duration: initialDelay, target_color: randomTrialImage},
    secondRandomIncorrectTrialProperties: {...trialProperties, pre_target_duration: 0, target_color: randomTrialImage}
  };
}

*/




   


