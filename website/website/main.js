window.addEventListener("load", function(){

    var browserInfo = detect_browser_info();
    var osInfo = detect_os_info();

    fetch('http://api.ipstack.com/check?access_key=041f61f553abc0aaea84ade16d4f55dd&format=1')
        .then(response => response.json())
        .then(data => {
            window.user = {
                country: data.country_name,
                state: data.region_name,
                city: data.city,
                postal: data.zip,
                latitude: data.latitude,
                longitude: data.longitude,
                ip: data.ip,
                continent_code: data.continent_code,
                continent_name: data.continent_name,
                country_code: data.country_code,
                region_code: data.region_code,
                capital_city: data.location.capital,
                language_code: data.location.languages[0].code,
                language_name: data.location.languages[0].name,
                country_flag_url: data.location.country_flag,
                country_flag_emoji: data.location.country_flag_emoji,
            }

            let payload = {
                country: window.user.country,
                state: window.user.state,
                city: window.user.city,
                postal: window.user.postal,
                latitude: window.user.latitude,
                longitude: window.user.longitude,
                ip: window.user.ip,
                continent_code: window.user.continent_code,
                continent_name: window.user.continent_name,
                country_code: window.user.country_code,
                region_code: window.user.region_code,
                capital_city: window.user.capital_city,
                language_code: window.user.language_code,
                language_name: window.user.language_name,
                country_flag_url: window.user.country_flag_url,
                country_flag_emoji: window.user.country_flag_emoji,
                browser_name: browserInfo.browser_name,
                browser_full_version: browserInfo.full_version,
                browser_major_version: browserInfo.major_version,
                navigator_app_name: browserInfo.navigator_app_name,
                navigator_user_agent: browserInfo.navigator_user_agent,
                os_name: osInfo.os_name,
            };

            divolte.signal('onloadEvent', payload);

            document.getElementById("content").textContent = JSON.stringify(payload, undefined, 2);
        })
        .catch(err => console.error(err));

});

function detect_browser_info() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName  = navigator.appName;
    var fullVersion  = ''+parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion,10);
    var nameOffset,verOffset,ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+6);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome"
    else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset+7);
        if ((verOffset=nAgt.indexOf("Version"))!=-1)
            fullVersion = nAgt.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox"
    else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <
        (verOffset=nAgt.lastIndexOf('/')) )
    {
        browserName = nAgt.substring(nameOffset,verOffset);
        fullVersion = nAgt.substring(verOffset+1);
        if (browserName.toLowerCase()==browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix=fullVersion.indexOf(";"))!=-1)
        fullVersion=fullVersion.substring(0,ix);
    if ((ix=fullVersion.indexOf(" "))!=-1)
        fullVersion=fullVersion.substring(0,ix);

    majorVersion = parseInt(''+fullVersion,10);
    if (isNaN(majorVersion)) {
        fullVersion  = ''+parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion,10);
    }

    return {
        browser_name: browserName,
        full_version: fullVersion,
        major_version: majorVersion,
        navigator_app_name: navigator.appName,
        navigator_user_agent: navigator.userAgent,
    };
}

function detect_os_info() {

    var OSName="Unknown OS";
    if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
    if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
    if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
    if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

    return {
        os_name: OSName,
    };
}
