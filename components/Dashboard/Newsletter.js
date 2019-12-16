import Button from '@material-ui/core/Button';
import Handlebars from 'handlebars';
import { withSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { generateDraftId } from '../../helpers/drafts';
import { SAVE_DRAFT } from '../../helpers/graphql/drafts';
import { GET_POST_IMAGE } from '../../helpers/graphql/singlePost';
import {
  GET_NEWSLETTER_DRAFT,
  SAVE_NEWSLETTER,
  SEND_NEWSLETTER,
} from '../../helpers/graphql/weeklypost';
import graphQLClient from '../../helpers/graphQLClient';
import ConfirmBtn from './Newsletter/ConfirmBtn';
import NewsletterInput from './Newsletter/NewsletterInput';
import NewsletterPreview from './Newsletter/NewsletterPreview';

const Newsletter = props => {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [updates, setUpdates] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const newNotification = notification => {
    if (notification !== undefined) {
      let variant = 'success';
      if (notification.success === false) {
        variant = 'error';
      }
      props.enqueueSnackbar(notification.message, { variant });
    }
  };

  const saveDraft = () => {
    const variables = {
      title,
      intro,
      updates: JSON.stringify(updates),
      posts: JSON.stringify(posts),
    };
    graphQLClient(SAVE_NEWSLETTER, variables).then(res => {
      if (res.saveNewsletter) newNotification(res.saveNewsletter);
    });
  };

  const sendNewsletter = isTest => {
    const variables = {
      title,
      intro,
      updates: JSON.stringify(updates),
      posts: JSON.stringify(posts),
      isTest,
    };
    graphQLClient(SEND_NEWSLETTER, variables)
      .then(res => {
        if (res.sendNewsletter) newNotification(res.sendNewsletter);
      })
      .catch(() => {
        newNotification({
          success: false,
          message:
            'Newsletter could not be sent. Please wait a few seconds and try again.',
        });
      });
  };
  const savePostDraft = () => {
    const source = `
{{{intro}}}

{{#each updates}}
---

## {{title}}

{{#if image}}
![]({{image}})
{{/if}}

{{{text}}}

{{#if button}}
[{{button}}]({{link}})
{{/if}}

{{/each}}
---

## Changelog

Paste the changelog and link to Github

---

## How to Get Involved?

Are you not on TravelFeed yet? We invite you to check out [TravelFeed.io](https://travelfeed.io/) and to join our over 900-strong [community on Discord](https://discord.gg/jWWu73H). We’re also looking for one more curator to join our team.

As mentioned above, we ❤️ Open Source: We are proud to make TravelFeed fully Open-Source, and support other communities on Steem who want to build on our code, which can be found on Github. We’re still looking for contributors who want to work with us on the future of TravelFeed. We’re in Beta and continuously improving the software, meaning that there are still some bugs. If you notice anything or have feedback for us, please don’t hesitate to contact us on [our Discord](https://discord.gg/jWWu73H), leave a comment or open a bug report on our Github!

## Consider Delegating To Us

Your delegation not only supports the growth of this incredible project, but also helps the entire travel community on the Steem blockchain. Once we launch our token, the airdrop to delegators will be based on the amount of SteemPower delegated and your share of the total delegations for each day delegated. This means an advantage for early investors delegating now. Our Steem Power is fully used for curation of the best TravelFeed posts and we provide temporary delegations to accounts created through us, to help with resource credits. Feel free to use the following links according to the amount you would like to delegate to [@travelfeed](https://travelfeed.io/@travelfeed):

<center><a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=100%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>100 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=250%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>250 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=500%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>500 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=1000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>1000 SP</a><br/><a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=2500%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>2500 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=5000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>5000 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=10000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>10000 SP</a><br/><a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=15000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>15000 SP</a> | <a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=25000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>25000 SP</a><br/><a href='https://beta.steemconnect.com/sign/delegate_vesting_shares?delegatee=travelfeed&vesting_shares=50000%20SP&redirect_uri=https%3A%2F%2Ftravelfeed.io%2Fdelegation%2Fsuccess'>50000 SP</a></center>

And again, we'd like to thank every single delegator who believes and trusts in us. If TravelFeed becomes as successful as we are confident it will be, delegating to us is probably the investment with the highest ROI on Steem right now. 

---

## Winners of This Week's Round-up

And with all this exciting news, we don't want to forget to highlight our three favorite TravelFeed.io posts from this week. The rewards will go to the first three places as follows: 1st place - **14 STEEM**, 2nd place - **7 STEEM** and 3rd place - **3 STEEM**.

*The thumbnails are directly linked to the original posts. Please, click on the image and enjoy the read!*

{{#each posts}}
---

<div json='{"type":"linkTool","data":{"link":"https://travelfeed.io/@{{author}}/{{permlink}}","meta":{"title":"Place {{counter @index}}: {{title}}","description":"{{excerpt}}","image":"{{image}}","author":"{{author}}","permlink":"{{permlink}}"}}}'><center><strong>Place {{counter @index}}</strong></center><center><strong>{{title}}</strong> written by <a href="https://travelfeed.io/@{{author}}">@{{author}}</a></center><blockquote>{{excerpt}}</blockquote><center><a href="https://travelfeed.io/@{{author}}/{{permlink}}"><img src="{{image}}" /></img></a></center></div>

{{/each}}
`;
    Handlebars.registerHelper('counter', index => {
      return index + 1;
    });
    const template = Handlebars.compile(source);

    const data = {
      title,
      intro,
      updates,
      posts,
    };

    // Get post images
    posts.forEach((post, i) => {
      graphQLClient(GET_POST_IMAGE, {
        author: post.author,
        permlink: post.permlink,
      }).then(res => {
        posts[i].image = res.post.img_url;
        if (i === posts.length - 1) {
          const body = template(data);
          graphQLClient(SAVE_DRAFT, {
            id: generateDraftId('travelfeed'),
            title,
            body,
            isCodeEditor: true,
            json: JSON.stringify({
              tags: [
                'travel',
                'palnet',
                'neoxian',
                'steemleo',
                'fundition-81n9hwooj',
              ],
            }),
          }).then(sdres => {
            if (sdres.addDraft) newNotification(sdres.addDraft);
          });
        }
      });
    });
  };

  const onClear = () => {
    setTitle('');
    setIntro('');
    setUpdates([]);
    setPosts([]);
  };

  useEffect(() => {
    graphQLClient(GET_NEWSLETTER_DRAFT).then(res => {
      if (res && res.newsletterDraft) {
        setTitle(res.newsletterDraft.title);
        setIntro(res.newsletterDraft.intro);
        setUpdates(res.newsletterDraft.updates);
        setPosts(res.newsletterDraft.posts);
      }
    });
  }, []);

  return (
    <>
      <div className="container pb-3">
        <div className="row row justify-content-center">
          <div className="col-xl-6 col-lg-6 col-md-10 col-sm-11 col-12">
            <NewsletterInput
              title={title}
              setTitle={setTitle}
              intro={intro}
              setIntro={setIntro}
              updates={updates}
              setUpdates={setUpdates}
              posts={posts}
              setPosts={setPosts}
              loading={loading}
              setLoading={setLoading}
            />
          </div>
          <div className="col-xl-6 col-lg-6 col-md-10 col-sm-11 col-12">
            <NewsletterPreview
              title={title}
              intro={intro}
              updates={updates}
              posts={posts}
              loading={loading}
            />
          </div>
          <div className="col-12">
            <ConfirmBtn
              btnText="Clear"
              dialogText="Clear the form?"
              onConfirm={onClear}
            />
            <Button
              className="m-1"
              variant="contained"
              onClick={saveDraft}
              color="primary"
            >
              Save draft
            </Button>
            <Button
              className="m-1"
              variant="contained"
              onClick={() => sendNewsletter(true)}
              color="primary"
            >
              Send Test Newsletter
            </Button>
            <Button
              className="m-1"
              variant="contained"
              onClick={() => sendNewsletter(false)}
              color="primary"
            >
              Send Newsletter
            </Button>
            <Button
              className="m-1"
              variant="contained"
              onClick={savePostDraft}
              color="primary"
            >
              Generate post draft
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withSnackbar(Newsletter);
