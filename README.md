blockr
======

An unbelievably crude Chrome extension that blocks a list of Twitter users.

### Warning: this is a HACK, and may break your stuff. I've been using it on my personal Twitter account all night and so far nothing has busted. May not be true for you, so be careful and take small bites at first.

#### Why an extension?

Chrome extensions have the necessary levels of access to grab the list from GitHub and do the necessary hacking and slashing on Twitter. Doing it with the Twitter API would be horrible.

#### What does it do?

Assuming you're signed in to Twitter, Blockr will:

- go find your authenticity token by loading https://twitter.com/intent/tweet
- grab @freebsdgirl's list of GamerGate hooligans from https://github.com/freebsdgirl/ggautoblocker.
- block however many of these that you want

#### Whoa, it looks like this hits the `/report_spam` endpoint. Does it report for spam?

No, because we're leaving the `report_type` parameter out. Sorry, the endpoint has a confusing name; personally I would have called it `/block`, to complement the `/unblock` endpoint. 

#### How do I use it?

- Use the Download ZIP button on this page to get the archive containing manifest.json and blockr.js.
- Unzip this archive. You should have one folder, probably named `blockr-master`.
- Open up Chrome's extension page by typing `chrome://extensions` into your URL bar.
- Be sure the checkbox next to "Developer mode" is checked! (thanks, @soypunk!)
- Drag the folder into the extensions page until you see the Drop to Install note.
- Drop it.
- Click the link next to Inspect Views, which says "background page."
- Open up the Console tab and enter `block(0, 10)`.

If all goes well, you'll see something like this:

    got token: 5d39109c3dce3bda61f83f09e23999f2f19bd285
    15413 accounts found.
    
... and then a bunch of entries like this one, spaced 250ms apart:

    blocking: 00GGDouche 
    POST https://twitter.com/i/user/report_spam 403 (Forbidden)
    XHR finished loading: POST "https://twitter.com/i/user/report_spam".
    blocked 00GGDouche 
    
Don't worry about the 403s; it seems to work regardless. Spot-check accounts on this list by appending it to https://twitter.com, thusly:

    https://twitter.com/0GGdoucheGG

If the Block button says "blocked," you're done. 

#### Jeez, this thing is ugly. Any plans for an actual user interface? 

Not presently, sorry; please feel free to fork and fix. It's a hack, folks, and I imagine Twitter will break it as soon as it starts to look useful.

#### How can I check if it worked on all of them?

Ha, ha, haaah, he said, wiping away tears of mirthless laughter. You can't. If you have a public account on Twitter, a theoretically infinite number of miscreants can jump right into your timeline with hobnailed boots and you can never, ever make them go away without taking your account private.

Twitter offers no real way to manage blocked accounts. I've tried TwitBlock and a few others, and they are slow, broken, or both.  And once you get up over 1500, there seems to be no available way to even list them out via the Twitter API. 

I suspect that this is not an attractive problem for Twitter to solve. There aren't enough users who might want to power-block a bunch of accounts, those API queries are expensive, and there's just got too much else going on in the make-some-money department.

#### So there's no going back once I do this?

Not exactly. If you block everyone on the list, you'll need to find the URL leading to the list of IDs you blocked. (Important: IDs, not screen names.) 

#### Yesterday I needed to unblock everyone I'd blocked and re-do.  Here's how I did it:

How I found the old list:

- From the main page at https://github.com/freebsdgirl/ggautoblocker I clicked the link to block_ids.txt 
- I wound up up on https://github.com/freebsdgirl/ggautoblocker/blob/master/block_names.txt
- I clicked the History button and found the version that was up when I made my first run.
- It was this: https://github.com/freebsdgirl/ggautoblocker/commit/5539e9e17eca20f81c94b2a7b53a7a27030fe890
- I clicked the View button to get here: https://github.com/freebsdgirl/ggautoblocker/blob/5539e9e17eca20f81c94b2a7b53a7a27030fe890/block_names.txt
- Finally, I clicked the Raw button to get here: https://raw.githubusercontent.com/freebsdgirl/ggautoblocker/5539e9e17eca20f81c94b2a7b53a7a27030fe890/block_names.txt

Once I found my original file, I changed the contents of `listUrl`:

    var listUrl = 'https://raw.githubusercontent.com/freebsdgirl/ggautoblocker/5539e9e17eca20f81c94b2a7b53a7a27030fe890/block_ids.txt';

Then I changed lines 12 and 13 to use the `/unblock` endpoint, and sent just `authenticity_token` and `user_id`, like this:

    var params = 'authenticity_token=' + token + '&user_id=' + id;
    http.open('POST', 'https://twitter.com/i/user/unblock', true);
    
Clicked the link that said Reload and went back into my console, as before.

Ran `block(0, 5)` to make sure it works on the first few of records, and got me the number of lines in the file. 

Worked, minus the 404s for bank lines at the top? Cool.  Ran `block(2, 15624)` to unblock everyone. (While this was running I noticed that the `/unblock` endpoint never gave back a 403; there seems to be no rate limit. Weird, huh? You'd think it would be the other way around.)

Since this was an undo-plus-redo, I changed everything in code back to the way it was before I undid, reloaded the extension, and re-ran to block. 

