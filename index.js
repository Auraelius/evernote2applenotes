const fs = require('fs');
const parser = require('xml2json');

/**
 * currently only handles a single note
 */

fs.readFile('./temp.enex', function (err, data) {
  let json = JSON.parse(parser.toJson(data, { reversible: true }));

  let meta = {};
  meta.title = json['en-export']['note']['title']['$t'];
  meta.created = json['en-export']['note']['created']['$t'];
  meta.updated = json['en-export']['note']['updated']['$t'];
  meta.tags = reformatTags(json['en-export']['note']['tag']);
  meta.attributes = attr2html(json['en-export']['note']['note-attributes']);

  let oldContent = json['en-export']['note']['content']['$t'];
  let updatedContent = inject(meta, oldContent);
  json['en-export']['note']['content']['$t'] = updatedContent;

  let stringified = JSON.stringify(json);
  let xml = parser.toXml(stringified);
  // fs.writeFile('survey-fixed.xml', xml, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('updated!');
  //   }
  // });
});

/**
 *
 * @param {Object[]} tagArray tags from export
 * @returns {String[]} newTags reformated tag array
 */
function reformatTags(tagArray) {
  let newTags = tagArray.map(updateTag);
  return newTags;

  function updateTag(t) {
    let tag = '#' + t.$t.toLowerCase().replace(' ', '-');
    return tag;
  }
}

function attr2html(attrObj) {
  let html = '<p>tbd</p>';
  return html;
}

function inject(metadata, content) {
  let info = `<div>
  <ul>
    <li>title: ${metadata.title}</li>
    <li>created: ${metadata.created}</li>
    <li>updated: ${metadata.updated}</li>
    <li>tags: ${metadata.tags}</li>
    <li>attributes: ${metadata.attributes}</li>
  </ul> </div>`;

  let preamble = getPreamble(content);
  let theRest = getTheRest(content);
  let newContent = preamble + info + theRest;
  return newContent;

  function getPreamble (contentString) {
    let target = `<en-note>`;
    let length = contentString.indexOf(target) + target.length;
    let preamble = contentString.substr(0, length);
    return preamble;
  }
  function getTheRest(contentString) {
    let target = `<en-note>`;
    let startIndex = contentString.indexOf(target) + target.length;
    let theRest = contentString.substring(startIndex);
    return theRest;
  }
}
