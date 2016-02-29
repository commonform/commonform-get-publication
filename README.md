```javascript
var getProject = require('commonform-get-project')
var assert = require('assert')

getProject('ironsides', 'stock-power', '1e4d', function(error, project) {
  assert.equal(
    project.form,
    '6b9d9e9b13b36ae00feb26abbd292b11d260c6f524cbd2795cc4445819580a64') })
```
