Dupe Timeline Lists - Userscript for properly displaying duplicate lists in post timelines

script timeline duplicates


<!-- thumbnail:  -->
<!-- version: 3.0.0 -->
<!-- tag: script -->
<!-- excerpt: The native post timeline displays "duplicate lists edited" event as an unreadable mess of links. This userscript diffs the changes and displays them as easy to visually parse lists of items. -->


## About

## Screenshot / Code Snippet

/timeline pages:

[![post timeline with duplicate target edit diffs][1]][1]

/revisions pages:

[![post revisions with duplicate target edit diffs][2]][2]

duplicate list reorderings:

[![post timeline with duplicate targets reordered][3]][3]

## About

The native post timeline displays "duplicate lists edited" event as a barely readable blob of links with excessive verbosity ("duplicate list changed from [list of links] to [list of links]"). This userscript *diffs* the changes and displays them as easy to visually parse lists of items.

As of v1.2.0, also fixes duplicate list edit entries on /revisions pages.

As of v2.0.0 uses [Userscripts Configurer][16] to provide configuration options. Currently, 3 options are available:

| Option    | Default          | Description |
| --------- | ---------------- | ----------- |
| Colored diffs | `true` | Color-code (red/green) changes in diff view |
| List type | `always-ordered` | Always prepend item number to items |
| View type | `list` | View to use for edit lists |

Example of the diff view:

![Diff view for the "duplicates list edited" timeline event with 1 target added and 0 removed][17]

As of v3.0.0 uses its own storage for optional configuration (available by installing a [Userscript Configurer][18] peer dependency).

Userscript dependencies:
- [type definitions][12] for Stack Exchange global objects;
- [type definitions][13] for the Stack Exchange API;
- shared [userscript configurer][16] (peer);
- userscript manager [metadata block generator][14].

  [1]: https://i.stack.imgur.com/kgTUf.png
  [2]: https://i.stack.imgur.com/bSug1.png
  [3]: https://i.stack.imgur.com/K43Og.png
  [4]:  https://spdx.org/licenses/GPL-3.0-or-later
  [5]:  https://github.com/userscripters/dupe-timeline-lists/raw/master/dist/modern/index.user.js
  [6]:  https://github.com/userscripters/dupe-timeline-lists/raw/master/dist/modern/index.min.user.js
  [7]: https://stackoverflow.com/users/11407695/oleg-valter
  [8]: https://github.com/userscripters
  [9]: https://github.com/userscripters/dupe-timeline-lists/issues
  [10]: https://chat.stackoverflow.com/rooms/214345/userscript-newbies-and-friends
  [11]: https://github.com/userscripters/dupe-timeline-lists/blob/master/src/index.ts
  [12]: https://stackapps.com/q/9063/78873
  [13]: https://stackapps.com/q/9162/78873
  [14]: https://stackapps.com/q/9088/78873
  [15]: https://github.com/userscripters/dupe-timeline-lists/pulls
  [16]: https://stackapps.com/q/9403/78873
  [17]: https://i.stack.imgur.com/xh4V7.png
  [18]: https://github.com/userscripters/userscripts-configurer/raw/master/dist/modern/index.user.js

### License

The script is licensed under the [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later) license.

### Download

Latest version: 3.0.0

[Install](https://github.com/userscripters/dupe-timeline-lists/raw/master/dist/modern/index.user.js) | [Minified](https://github.com/userscripters/dupe-timeline-lists/raw/master/dist/modern/index.min.user.js)


### Platform

Version number means "last tested on":

| Chrome | Edge | Explorer | Firefox | Opera |
| - | - | - | - | - |
| ✔ 100.0.4896.127 | - | - | ✔ 99.0.1 | - |

## Change log

| Version    | Description |
| ---------- | ----------- |
| 3.0.0 |             |

## Contact

Author: Oleg Valter
<br>Organization: [UserScripters](https://github.com/userscripters)

Please, submit bug reports [on the source repository](https://github.com/userscripters/dupe-timeline-lists/issues).
<br>Before adding a new one, please check if it hasn't been raised before.

You can also [drop by to chat](https://chat.stackoverflow.com/rooms/214345), we are a friendly bunch.

## Code

[Source code](https://github.com/userscripters/dupe-timeline-lists/blob/master/src/index.ts) is written in TypeScript.

Contributions are welcome, you can always [submit a PR here](https://github.com/userscripters/dupe-timeline-lists/pulls).