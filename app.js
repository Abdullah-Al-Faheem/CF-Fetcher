browser.browserAction.onClicked.addListener(async (tab) => 
{
    try     
    {
        const url = new URL(tab.url);
        const parts = url.pathname.split('/');

        let contestID, problemNumber;

        if (parts.length === 5 && parts[1] === 'problemset' && parts[2] === 'problem') 
        {
            contestID = parts[3];
            problemNumber = parts[4];
        } 
        else if (parts.length === 5 && parts[1] === 'contest' && parts[3] === 'problem') 
        {
            contestID = parts[2];
            problemNumber = parts[4];
        } 
        else 
        {
            await browser.tabs.executeScript(tab.id, { code: `alert("Bruh, it's not a CF PROBLEM PAGE!");`} );
            return;
        }

        url.pathname = `/contest/${contestID}/status/${problemNumber}`;
        url.search = '?friends=on';

        await browser.tabs.create({ url: url.toString() });
    } 
    catch (err) 
    {
        console.error("Failed to redirect:", err);
    }
});