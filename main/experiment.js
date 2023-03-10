    /*************** EXPERIMENT START ***************/

function expStart() {

    // variable creation

    if (isOffline == true) {
        variableCreation(subject.value, session.value)
    }
    else {
        variableCreation()
    }

    // timeline creation and run

    const timeline = timelineCreation();
    const images = ["../static/images/ASRT_en.gif", "../static/images/ASRT_hu.gif", "../static/images/keyboard.bmp", "../static/images/dalmata.jpg", "../static/images/ASRT_en2.gif", "../static/images/penguin.jpg"]; //preload memo logo (stimuli images are preloaded automatically)
    
   const all_audio_files = ["../static/sound/buzz.wav", "../static/sound/dogBarking.wav", "../static/sound/penguinSound.wav", "../static/sound/dance.wav", "../static/sound/guitare.wav"];


    jsPsych.init({
        timeline: timeline,
        use_webaudio: false,
        preload_audio: all_audio_files,
        preload_images: images,
        on_data_update: function () {
            dataUpdate()
        },
        on_close: function () {
            if(isOffline == true) {
                jsPsych.data.get().localSave("csv", "ASRT_subject" + `${subject.value}` + "_session_" + `${session.value}` + "_quit_output.csv");
            } else {
                jsPsych.data.get().localSave("csv", "ASRT_quit_output.csv");
            }            
        },
        on_finish: function () {
            if(isOffline == true) {
                jsPsych.data.get().localSave("csv", "ASRT_subject" + `${subject.value}` + "_session_" + `${session.value}` + "_output.csv");
            }  else {
                jsPsych.data.get().localSave("csv", "ASRT_output.csv");
            }         
        }
    })
}