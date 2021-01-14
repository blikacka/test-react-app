const isIE = navigator.userAgent.match(/MSIE|Trident|Edge/)
const IEVersion = ((navigator.userAgent.match(/(?:MSIE |Trident.*rv:|Edge\/)(\d+(\.\d+)?)/)) || []) [1]

if (isIE && parseInt(IEVersion, 10) <= 10) {
    document.getElementById('update-browser').style.display = 'block'
    document.getElementById('app').style.display = 'none'
}
