#DB設計

## 必要な機能
・ユーザ管理機能
・お気に入り機能
・TODOリスト機能
・ポイント残高機能
・支払い方法機能
・出品情報機能
・ブランド機能
・カテゴリ機能
・出品地域機能
・取引状態管理機能


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|mail_address|text|null: false  unique: true|
|password|text|null: false|
|nickname|text|null: false  add_index:true|
### Association
- has_many :transactions,throgh: :buyers
- has_many :buyers
- has_many :transactions,throgh: :sellers
- has_many :sellers
- has_many :todolists
- has_many :payment_infomations
- has_many :products,throgh: :likes
- has_many :likes
- has_many :newsfeeds,throgh: :user_notifications
- has_many :user_notifications

##### 備考：
- 基本情報は別のテーブルで記載

## user_informationテーブル
|Column|Type|Options|
|------|----|-------|
|family_name_kanji|text|null: false  |
|first_name_kanji|text|null: false  |
|family_name_kana|text|null: false  |
|first_name_kana|text|null: false  |
|profile|text|null: false  |
|birth_year|integer|null: false  |
|birth_month|integer|null: false  |
|birth_day|integer|null: false  |
|postal_code|integer|null: false  |
|address_prefecture|text|null: false  |
|address_city|text|null: false  |
|address_street|text|null: false  |
|address_building|text|null: false  |
|mobile_number|integer|null: false  |
|user_id|integer|foreign_key: true|

### Association
belongs_to :user

## point_amountテーブル
|Column|Type|Options|
|------|----|-------|
|amount|integer|null: false  |
|due_date|integer|null: false  |
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user


## todolistテーブル
|Column|Type|Options|
|------|----|-------|
|todo_title|text|null: false|
|todo_body|text|null: false|
|todo_due|date|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user

## payment_informationテーブル
|Column|Type|Options|
|------|----|-------|
|due_year|integer|null: false  |
|due_month|integer|null: false  |
|security_code|integer|null: false  |
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user

## buyerテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|transaction_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :transaction
- belongs_to :user

##### 備考：
- userとtransactionテーブルの中間テーブル。多対多の関係が存在する前提


## sellerテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|transaction_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :transaction
- belongs_to :user


## transactionテーブル
|Column|Type|Options|
|------|----|-------|
|transaction_status|integer|null: false  |
|seller_id|integer|null: false, foreign_key: true|
|buyer_id|integer|null: false, foreign_key: true|
|product_id|integer|null: false, foreign_key: true|
|review_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :product
- has_many :users,throgh: :buyers
- has_many :buyers
- has_many :users,throgh: :sellers
- has_many :sellers
- has_many :review_id

##### 備考：
- trasactionテーブルは２つの中間テーブル（buyer,seller）を経由してuserテーブルと多対多の関係性が存在


## reviewテーブル
|Column|Type|Options|
|------|----|-------|
|review|text|null: false  |

##### 備考：
- transactioonテーブルで評価者、被評家者の管理をする


## user_notificationテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|newsfeed_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :newsfeed
- belongs_to :user

##### 備考：
- user_newsfeedの中間テーブルとしている

## newsfeedテーブル
|Column|Type|Options|
|------|----|-------|
|news_title|text|null: false  |
|news_body|text|null: false  |
|sent_at|integer|timestamp  |
|personal_message|boolean|default: false, null: false|

### Association
- has_many :users through::users_notifications
- has_many :users_notifications

##### 備考：
- personal_messageはフラグとして使用する。デフォルト設定を追加した。


## likeテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|product_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :product
- belongs_to :user

##### 備考：
- user_productの中間テーブルとしている


## productテーブル
|Column|Type|Options|
|------|----|-------|
|product_name|text|null: false  |
|product_description|text|null: false  |
|top_category_id|integer|null: false, foreign_key: true|
|mid_category_id|integer|null: false, foreign_key: true|
|low_category_id|integer|null: false, foreign_key: true|
|condition_id|integer|null: false, foreign_key: true|
|delivery_fee_id|integer|null: false, foreign_key: true|
|packing_day_id|integer|null: false, foreign_key: true|
|product_price|integer|null: false|
|size|text|null: false|
|prefecture_id|integer|null: false, foreign_key: true|
|brand_id|integer|foreign_key: true|


### Association
- has_many :users,throgh: :likes
- has_many :likes
- has_many :product_images
- has_many :images,throgh: :product_images
- has_many :transactions

##### 備考：
- productテーブルはtransaction-Userでつなぐべきなのか？
- 現状、productテーブルはbuyer/seller-Userでつないでいる。


## brandテーブル
|Column|Type|Options|
|------|----|-------|
|name|text|null: false  add_index: true|
|top_category_id|integer|foreign_key: true|
### Association
- belongs_to :top_category
- has_many :products

##### 備考：
- ブランド名で検索するのでインデックスを追加

## top_categoryテーブル
|Column|Type|Options|
|------|----|-------|
|top_category_name|text|null: false|

### Association
- has_many :mid_categories

## mid_categoryテーブル
|Column|Type|Options|
|------|----|-------|
|mid_category_name|text|null: false|
|top_category_id|integer|null: false  foreign_key: true|
### Association
- belongs_to :top_category
- has_many :products
- has_many :low_categories

##### 備考：
- top_categoryは親、low_categoryは子関係がある。

## low_categoryテーブル
|Column|Type|Options|
|------|----|-------|
|low_category_name|text|null: false  |
|mid_category_id|integer|null: false  foreign_key: true|
### Association
- belongs_to :mid_category
- has_many :products

##### 備考：
- mid_categoryは親テーブルがある。


## conditionテーブル
|Column|Type|Options|
|------|----|-------|
|condition_description|text|null: false |

## delivery_feeテーブル
|Column|Type|Options|
|------|----|-------|
|payment|text|null: false |


## product_imageテーブル
|Column|Type|Options|
|------|----|-------|
|image_id|integer|null: false, foreign_key: true|
|product_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :product
- belongs_to :image

##### 備考：
- productは最大１０枚の写真を投稿できるため、中間テーブルを作成。


## imageテーブル
|Column|Type|Options|
|------|----|-------|
|image_file_name|text|null: false|
### Association
- has_many :products,throgh: :product_images
- has_many :product_images

##### 備考：
- product_imagesを中間テーブルとしている


## packing_dayテーブル
|Column|Type|Options|
|------|----|-------|
|paking_day|text|null: false|


## prefectureテーブル
|Column|Type|Options|
|------|----|-------|
|prefecture_name|text|null: false  |
|regional_area_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :regional_areas
- has_many :products


## regional_areaテーブル
|Column|Type|Options|
|------|----|-------|
|regional_area_name|text|null: false  |
### Association
- has_many :prefectures
