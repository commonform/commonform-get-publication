/* Copyright 2016 Kyle E. Mitchell
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = getPublication

var https = require('https')
var parse = require('json-parse-errback')

function getPublication(publisher, project, edition, callback) {
  https.request(
    { host: 'api.commonform.org',
      path:
        ( '/publishers/' + publisher +
          '/projects/' + project +
          '/publications/' + edition ) },
    function(response) {
      var status = response.statusCode
      if (status === 404) {
        callback(null, false) }
      else if (status !== 200) {
        var error = new Error()
        error.statusCode = status
        callback(error) }
      else {
        var buffers = [ ]
        response
          .on('data', function(buffer) {
            buffers.push(buffer) })
          .on('end', function() {
            var responseBody = Buffer.concat(buffers).toString()
            parse(responseBody, function(error, publication) {
              if (error) {
                callback(error) }
              else {
                callback(null, publication) } }) }) } })
    .end() }
