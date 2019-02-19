# Notes to Self
## TODO
1. User testing
1. Code Cleanup
    - bogus user agents, state, large blocks of HTML
    - Bugfix:
        - CORS
            - CORS IS NOT AN ACTUAL ERROR
                - https://medium.com/@baphemot/understanding-cors-18ad6b478e2b
            - for example, pushshift gave a CORS "error" but the actual error was status code 429 - too many requests (I had tried to load 30-40 tabs in under a minute)
                - look under Networks tab in Developer console
                - pushshift rate limit is 180 requests/min (https://api.pushshift.io/meta)
                - reddit is 60/min (https://not-an-aardvark.github.io/snoowrap/snoowrap.html#config__anchor)
            - snoowrap config can retry after rate limit error
            - pushshift probably doesn't
            - Snoowrap can give a CORS error if the anonymous requester expired
                - need to check if this is what's actually happening
                    - REINTRODUCE OLD BUG & WAIT ONE HOUR WITHOUT RELOADING BACKGROUND.JS
                - how likely is this to happen?
            - HTTP Status Codes lookup table: https://www.restapitutorial.com/httpstatuscodes.html
        - when posts/comments link to subreddits/users, the href does not go where you would expect
1. Thredd notifications
    - include options to mute or never show again
        - or option to open up Options page
1. IndexedDB to bypass 5MB LocalStorage limit
    - would need to implement expiring old data
        - probably as part of `changeAction`
        - all records should have an indexed timestamp called `expires_at`
            - created as part of the model initialization process
    - `db.url` should be indexed on `[url+submission_id], api_source, page_num`
        - use `Table.put()` or `Table.bulkPut()` to ignore primary key conflict
    - `Table.update()` can be used to prevent over-riding existing Submission data with inferior data
        - returns 0 if provided key not found **or** provided changes are identical to current values
        - if 1 then do a full update and run `snoo.getSubmission()` later
    - not sure what to do about Comments, probably same as now
1. Sorting and filtering
    - have a filter for "At least X comments" (initial value = 1) so you have something to read
        - turn this filter on by default
1. Pagination
1. Move ALL HTML into Javascript b/c otherwise you have to remember which HTML goes where
1. Think about actions for:
    - pages without posts
    - people who don't want to post/comment
1. additional Reddit API stuff
    - Edit
    - Hide
    - Report
    - etc.
1. could right-clicking Open In New Tab somehow keep popup window open?
    - or make the extension an overlay so it doesn't keep closing

Where to get outside help?
    - ideally trustworthy
        - Alessia, Josh, Sami
    - if can't get the above ppl how do I recruit a trustworthy stranger
