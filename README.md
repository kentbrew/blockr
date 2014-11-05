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
    
... and then a bunch of entries like this one, one second apart:

    blocking: 00GGDouche 
    POST https://twitter.com/i/user/report_spam 403 (Forbidden)
    XHR finished loading: POST "https://twitter.com/i/user/report_spam".
    blocked 00GGDouche 
    
Don't worry about the 403s; it seems to work regardless. Spot-check accounts on this list by appending it to https://twitter.com, thusly:

    https://twitter.com/0GGdoucheGG

If the Block button says "blocked," you're done. 

#### How can I check if it worked on all of them?

Ha, ha, haaah, he said, wiping away tears of mirthless laughter. You can't. If you have a public account on Twitter, a theoretically infinite number of miscreants can jump right into your timeline with hobnailed boots and you can never, ever make them go away without taking your account private.

Twitter offers no real way to manage blocked accounts. I've tried TwitBlock and a few others, and they are slow, broken, or both.  And once you get up over 1500, there seems to be no available way to even list them out via the Twitter API. 

I suspect that this is not an attractive problem for Twitter to solve. There aren't enough users who might want to power-block a bunch of accounts, those API queries are expensive, and there's just got too much else going on in the make-some-money department.

#### Jeez, this thing is ugly. Any plans for an actual user interface? 

Not presently, sorry; please feel free to fork and fix. It's a hack, folks, and I imagine Twitter will break it as soon as it starts to look useful.
