var count = 0
var etype_err = []
var once = false
var hotkey_on = false

async function copyToClipboard(time_ldap_flag, time, count, error) {
    var FQA = 'Y'
    var FQA_ldap = '\t'
    if (error != '') {
        FQA = 'N'
        FQA_ldap = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-15n39pb > div > div.css-10qyh7 > div > div.css-15yn9g5 > div:nth-child(14) > span").textContent + FQA_ldap
    }
    try {
        await navigator.clipboard.writeText(time_ldap_flag + '\t' + time + '\t' + count + '\t' + error + '\t' + FQA + '\t' + FQA_ldap + '\t\t\t' + window.location.href.split('#')[0])
            /* Resolved - text copied to clipboard successfully */
    } catch (err) {
        console.error('Failed to copy: ', err);
        /* Rejected - text failed to copy to the clipboard */
    }
}


requestAnimationFrame(clip_loop)

function clip_loop() {

    var car_count_text = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-1it6c3t > div > div.css-y2wiop > div:nth-child(3) > div:nth-child(2)")
    var etype_err_text = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-1it6c3t > div > div.css-y2wiop > div:nth-child(1) > div:nth-child(2)")
    if (car_count_text != null && etype_err != null && !once) {

        var test = this.baobabState.toJSON()
        var video_key = this.video.name.split(' ')[1]
        var data = test.videoData[video_key]
        var labels = data.labels.cuboid

        labels.forEach((l) => {
            if (l.type == 'suv') {
                count++
                if (l.emergencyType === undefined) {
                    etype_err.push(l._id)
                }
            }
        })

        car_count_text.textContent = `SUV Count: ${count}`
        etype_err_text.textContent = 'Unknown etype: ' + [...etype_err].join(', ')
        once = true
    }

    if (!hotkey_on) {
        document.addEventListener("keydown", (e) => {
            if (e.repeat) { return }

            var trans = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-15n39pb > div")
            if (trans != null) {
                if (e.ctrlKey && e.shiftKey && e.key == "C") {
                    e.preventDefault()
                    var time = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-15n39pb > div > div.css-10qyh7 > div > div.css-15yn9g5 > div:nth-child(17)").textContent
                    if (time.includes('m') && time.includes('s')) {

                        time = time.replace('s', '')
                        time = time.replace('m', '')
                        time = time.split(' ')

                        if (parseInt(time[1]) < 10)
                            time = `${time[0]}:0${time[1]}`
                        else
                            time = `${time[0]}:${time[1]}`

                    } else if (time.includes('s')) {
                        time = time.replace('s', '')
                        if (parseInt(time) < 10)
                            time = `0:0${time}`
                        else
                            time = `0:${time}`

                    } else if (time.includes('m')) {
                        time = time.replace('m', '')
                        time = `${time}:00`
                    }

                    var time_flag = time.split(':')
                    var time_ldap_flag = ''
                    if (parseInt(time_flag[0]) * 60 + parseInt(time_flag[1]) > 50)
                        time_ldap_flag = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-15n39pb > div > div.css-10qyh7 > div > div.css-15yn9g5 > div:nth-child(14) > span").textContent

                    copyToClipboard(time_ldap_flag, time, count, [...etype_err].join(', '))
                }
            }
        });
        hotkey_on = true
    }
    requestAnimationFrame(clip_loop)
}
