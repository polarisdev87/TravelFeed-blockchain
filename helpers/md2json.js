import parseBody from './parseBody';
import { tfJSON } from './regex';

const md2json = d => {
  try {
    const json = { time: 1564842925324, blocks: [], version: '2.15.0' };
    if (!d) return json;
    const data = `${d}\n\n`.replace(/\n([a-zA-Z!#])/, '\n\n$1');
    const paragraphs = data.split('\n\n');
    paragraphs.forEach(para => {
      const p = para.replace(/^\n/, '');
      let block;
      // tfJSON handling
      const tfjsonMatch = tfJSON.exec(p);
      if (tfjsonMatch) {
        try {
          block = JSON.parse(`{${tfjsonMatch[1]}}`);
        } catch {
          console.warn('Could not parse tfJSON block');
        }
      }
      // Header
      else if (p.match(/^#/)) {
        let level = 1;
        let text = p;
        if (p.match(/^# /)) {
          text = text.replace(/^# /, '');
        } else if (p.match(/^## /)) {
          text = text.replace(/^## /, '');
          level = 2;
        } else if (p.match(/^### /)) {
          text = text.replace(/^### /, '');
          level = 3;
        } else if (p.match(/^#### /)) {
          text = text.replace(/^#### /, '');
          level = 4;
        } else if (p.match(/^##### /)) {
          text = text.replace(/^##### /, '');
          level = 5;
        } else if (p.match(/^###### /)) {
          text = text.replace(/^###### /, '');
          level = 6;
        }
        block = { data: { text, level }, type: 'header' };
      }
      // image
      else if (p.match(/^!\[(.*)\]\((.*)\)/)) {
        const match = p.match(/^!\[(.*)\]\((.*)\)/);
        const caption = match[1];
        const url = match[2];
        block = { data: { caption, file: { url } }, type: 'image' };
      }
      // quote
      else if (p.match(/^> /)) {
        const text = p.replace(/^> /, '');
        block = { data: { text }, type: 'quote' };
      }
      // delimiter
      else if (p.match(/^---/)) {
        block = { data: {}, type: 'delimiter' };
      }
      // embed
      else if (p.match(/^<iframe /)) {
        const match = p.match(/ src="(.*)"/);
        const embed = match[1];
        block = { data: { embed }, type: 'embed' };
      }
      // list
      // ordered list
      else if (p.match(/^1. /)) {
        const items = [];
        const list = `${p}\n`;
        list.match(/\d\. .*\n/g).forEach(m => {
          const match = m.match(/\d\. (.*)\n/);
          items.push(match[1]);
        });
        block = { data: { items, style: 'ordered' }, type: 'list' };
      }
      // unordered list with -
      else if (p.match(/^- /)) {
        const items = [];
        const list = `${p}\n`;
        list.match(/- .*\n/g).forEach(m => {
          const match = m.match(/- (.*)\n/);
          items.push(match[1]);
        });
        block = { data: { items, style: 'unordered' }, type: 'list' };
      }
      // unordered list with *
      else if (p.match(/^\* /)) {
        const items = [];
        const list = `${p}\n`;
        list.match(/\* .*\n/g).forEach(m => {
          const match = m.match(/\* (.*)\n/);
          items.push(match[1]);
        });
        block = { data: { items, style: 'unordered' }, type: 'list' };
      }
      // TODO: table
      // paragraph
      else if (p !== '') {
        block = {
          data: { text: parseBody(p, { secureLinks: false }) },
          type: 'paragraph',
        };
      }
      if (block) json.blocks.push(block);
    });
    return { success: true, json };
  } catch (err) {
    console.warn(err);
    return { success: false };
  }
};

export default md2json;
