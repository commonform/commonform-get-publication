```javascript
var getPublication = require('commonform-get-publication')
var assert = require('assert')
var responded = 0

getPublication('ironsides', 'stock-power', '1e4d', function(error, publication) {
  assert.equal(publication.publisher, 'ironsides')
  assert.equal(publication.project, 'stock-power')
  assert.equal(publication.edition, '1e4d')
  assert.equal(
    publication.digest,
    '6b9d9e9b13b36ae00feb26abbd292b11d260c6f524cbd2795cc4445819580a64')
  responded++ })

getPublication('ironsides', 'nonexistent', '30e', function(error, publication) {
  assert.equal(publication, false)
  responded++ })

process.on('exit', function() {
  assert.equal(responded, 2)
  process.stdout.write('Tests passed.\n') })
```
