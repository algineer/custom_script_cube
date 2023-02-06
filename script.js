var car_clicked = false
var label = new Set()
var etype_err = new Set()
var trans_button = document.createElement('button')

var key_frames = []


async function copyContent(time_ldap_flag, time, count, error) {
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

function keyFrameButton() {

}


requestAnimationFrame(clip_loop)

function clip_loop() {
    var count_overflow = document.querySelector("#root > main > div > div.css-q2fgle > div.css-1nice15 > div.css-ogvgbo > div.css-427fvc > div.css-1blqnaw > div:nth-child(1) > div > div")
    var count = document.querySelector("#root > main > div > div.css-q2fgle > div.css-1nice15 > div.css-ogvgbo > div:nth-child(5)")
    var count2 = document.querySelector("#root > main > div > div.css-q2fgle > div.css-1nice15 > div.css-ogvgbo > div:nth-child(4)")

    document.addEventListener('wheel', () => {

        if (count_overflow != null) {
            count_overflow.childNodes.forEach(e => {
                var label_num = e.firstChild.firstChild.firstChild.firstChild.firstChild.textContent
                label.add(label_num)
                var etype = e.firstChild.firstChild.firstChild.childNodes[3].lastChild.value
                if (etype == 'unknown')
                    etype_err.add(label_num)
            })
        } else if (count != null) {
            count.childNodes.forEach((e, i) => {
                if (i > 1) {
                    var label_num = e.firstChild.firstChild.firstChild.textContent
                    label.add(label_num)
                    var etype = e.firstChild.childNodes[3].lastChild.value
                    if (etype == 'unknown')
                        etype_err.add(label_num)
                }
            })
        } else if (count2 != null) {
            count2.childNodes.forEach((e, i) => {
                if (i > 1) {
                    var label_num = e.firstChild.firstChild.firstChild.textContent
                    label.add(label_num)
                    var etype = e.firstChild.childNodes[3].lastChild.value
                    if (etype == 'unknown')
                        etype_err.add(label_num)
                }
            })
        }

        document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-1it6c3t > div > div.css-y2wiop > div:nth-child(3) > div:nth-child(2)").textContent = `Car Count: ${label.size}`
        document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-1it6c3t > div > div.css-y2wiop > div:nth-child(1) > div:nth-child(2)").textContent = 'Unknown etype: ' + [...etype_err].join(', ')

    });

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
                if (parseInt(time_flag[0]) * 60 + parseInt(time_flag[1]) > 70)
                    time_ldap_flag = document.querySelector("#root > main > div > div.css-120gz53 > div > div.css-15n39pb > div > div.css-10qyh7 > div > div.css-15yn9g5 > div:nth-child(14) > span").textContent

                copyContent(time_ldap_flag, time, label.size, [...etype_err].join(', '))
            }
        }
    });


    if (count != null) {
        keyFrameButton(count)
    } else if (count_overflow != null) {
        keyFrameButton(count_overflow)
    }


    requestAnimationFrame(clip_loop)
}
