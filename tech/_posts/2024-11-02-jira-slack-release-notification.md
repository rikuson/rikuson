---
layout: post
title: Automate Slack Notifications for Pre- and Post-Release Messages with Jira
image: https://rikson.imgix.net/2024-11-02-jira-slack-release-notification.jpg?w=856
---

Recently, I set up a Jira automation that sends Slack messages to notify the team both before and after a release. While this type of notification system is a common request, configuring it in Jira can be challenging—especially for pre-release notifications.

Requirements: if there is a scheduled release, a notification should be posted in the designated Slack channel every day at 1 p.m. to remind the team. Additionally, once the release status changes to "Released," a message should be posted to inform the release on Slack.

## Pre-Release Notification Setup

Here's a breakdown of the automation I implemented to send a message before the release time.

![Pre-Release Automation](https://rikson.imgix.net/Screen Shot 2024-11-02 at 21.57.48.png)

### Step 1: Schedule the Trigger

To start, the automation uses a "Scheduled" trigger, configured to check for releases at 1 p.m. every day.

![Schedule the Trigger](https://rikson.imgix.net/Screen Shot 2024-11-02 at 21.58.05.png)

### Step 2: Look Up Relevant Issues

The next step is to use a "Lookup Issues" action with the following JQL query. This query identifies issues associated with an unreleased version:

```
fixVersion in unreleasedVersions("My Team")
```

![Look Up Query](https://rikson.imgix.net/Screen Shot 2024-11-02 at 21.58.15.png)

### Step 3: Check for Unreleased Versions

To ensure that a notification only goes out if there is a release planned, we add a condition to verify that tickets linked to a release version were found. This uses the following template variable:

```
{% raw %}{{lookupIssues.fixVersions.size}}{% endraw %}
```

If the value is non-zero, it means there are unreleased versions scheduled for release.

![Notification Condition](https://rikson.imgix.net/Screen Shot 2024-11-02 at 21.58.23.png)

### Step 4: Create a Message Template

Finally, a message template is created to list any versions scheduled for release that day. Here’s the template used for the Slack notification:

```
{% raw %}@channel
There's a release scheduled for today!
version: {{lookupIssues.fixVersions.name.distinct.flatten().join(" ")}}
{{#lookupIssues.fixVersions.distinct.flatten()}}
https://example.atlassian.net/projects/MYTEAM/versions/{{.}}/tab/release-report-all-issues
{{/}}{% endraw %}
```

![Message Template](https://rikson.imgix.net/Screen Shot 2024-11-02 at 21.58.41.png)

**Note:** This workflow only works if there is an issue linked to the release. If no issues are associated with the version, no Slack message will be sent.

## Post-Release Notification Setup

Configuring the post-release message is simpler. Here’s how it works:

![Post-Release Automation](https://rikson.imgix.net/Screen Shot 2024-11-02 at 22.10.51.png)

### Step 1: Define the Message Template

Once the release status is changed to "Released," the automation sends a Slack message for each release, using the following template:

![Message Template](https://rikson.imgix.net/Screen Shot 2024-11-02 at 22.11.10.png)

```
{% raw %}@channel
The release has gone live!

version: {{version.name}}
https://example.atlassian.net/project/MYTEAM/versions/{{issue.fixVersions}}/tab/release-report-all-issues{% endraw %}
```

Each release is announced individually, ensuring that every completed release gets its own notification.
