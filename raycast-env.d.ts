/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Buffer Access Token - Your Buffer API access token. Get it at publish.buffer.com/settings/api */
  "accessToken": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `scheduled-posts` command */
  export type ScheduledPosts = ExtensionPreferences & {}
  /** Preferences accessible in the `sent-posts` command */
  export type SentPosts = ExtensionPreferences & {}
  /** Preferences accessible in the `create-post` command */
  export type CreatePost = ExtensionPreferences & {}
  /** Preferences accessible in the `channels` command */
  export type Channels = ExtensionPreferences & {}
  /** Preferences accessible in the `draft-posts` command */
  export type DraftPosts = ExtensionPreferences & {}
  /** Preferences accessible in the `create-idea` command */
  export type CreateIdea = ExtensionPreferences & {}
  /** Preferences accessible in the `account-overview` command */
  export type AccountOverview = ExtensionPreferences & {}
  /** Preferences accessible in the `organizations` command */
  export type Organizations = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `scheduled-posts` command */
  export type ScheduledPosts = {}
  /** Arguments passed to the `sent-posts` command */
  export type SentPosts = {}
  /** Arguments passed to the `create-post` command */
  export type CreatePost = {}
  /** Arguments passed to the `channels` command */
  export type Channels = {}
  /** Arguments passed to the `draft-posts` command */
  export type DraftPosts = {}
  /** Arguments passed to the `create-idea` command */
  export type CreateIdea = {}
  /** Arguments passed to the `account-overview` command */
  export type AccountOverview = {}
  /** Arguments passed to the `organizations` command */
  export type Organizations = {}
}

