import $ from 'jquery' 

const loadHtmlSucessCallbacks = []

export function onLoadHtmlSuccess(callback) {
    if(!loadHtmlSucessCallbacks.includes(callback)){
        loadHtmlSucessCallbacks.push(callback)
    }
}

function loadIncludes(parent) {
    if(!parent) parent = 'body'
    $(parent).find('[wm-include]').each(function(i, e) {
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            sucess(data){
                $(e).html(data)
                $(e).removeAttr('wm-include')

                loadHtmlSucessCallbacks.forEach(
                    callback => callback(data))
                loadIncludes(e)
            }
        })
    })
}

loadIncludes()