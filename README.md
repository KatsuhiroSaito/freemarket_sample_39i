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
|email_address|string|null: false  unique: true|
|password|string|null: false|
|nickname|string|null: false  add_index:true|
### Association
- has_many :transactions,through: :buyers
- has_many :buyers
- has_many :transactions,through: :sellers
- has_many :sellers
- has_many :todolists
- has_many :payment_methods
- has_many :products,through: :likes
- has_many :likes
- has_many :newsfeeds,through: :user_notifications
- has_many :user_notifications
- has_one :user_detail

##### 備考：
- 基本情報は別のテーブルで記載

## user_detailsテーブル
|Column|Type|Options|
|------|----|-------|
|family_name_kanji|string|null: false  |
|first_name_kanji|string|null: false  |
|family_name_kana|string|null: false  |
|first_name_kana|string|null: false  |
|profile|text|null: false  |
|birth_year|integer|null: false  |
|birth_month|integer|null: false  |
|birth_day|integer|null: false  |
|postal_code|string|null: false  |
|address_prefecture|string|null: false  |
|address_city|string|null: false  |
|address_street|string|null: false  |
|address_building|string|null: false  |
|mobile_number|string|null: false  |
|user|references|foreign_key: true|

### Association
belongs_to :user

## pointsテーブル
|Column|Type|Options|
|------|----|-------|
|amount|integer|null: false  |
|due_date|integer|null: false  |
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user


## todolistsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false|
|body|text|null: false|
|due|date|null: false|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user

## payment_methodsテーブル
|Column|Type|Options|
|------|----|-------|
|due_year|integer|null: false  |
|due_month|integer|null: false  |
|security_code|string|null: false  |
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :user

## buyersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|transaction|references|null: false, foreign_key: true|
### Association
- belongs_to :transaction
- belongs_to :user

##### 備考：
- userとtransactionテーブルの中間テーブル。多対多の関係が存在する前提


## sellersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|transaction|references|null: false, foreign_key: true|
### Association
- belongs_to :transaction
- belongs_to :user


## transactionsテーブル
|Column|Type|Options|
|------|----|-------|
|transaction_status|integer|null: false  |
|seller|references|null: false, foreign_key: true|
|buyer|references|null: false, foreign_key: true|
|product|references|null: false, foreign_key: true|
|review|references|null: false, foreign_key: true|

### Association
- belongs_to :product
- has_many :users,through: :buyers
- has_many :buyers
- has_many :users,through: :sellers
- has_many :sellers
- has_many :review_id

##### 備考：
- transactionテーブルは２つの中間テーブル（buyer,seller）を経由してuserテーブルと多対多の関係性が存在


## reviewsテーブル
|Column|Type|Options|
|------|----|-------|
|review|text|null: false  |

##### 備考：
- transactionテーブルで評価者、被評価者の管理をする


## user_notificationsテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|newsfeed|references|null: false, foreign_key: true|
### Association
- belongs_to :newsfeed
- belongs_to :user

##### 備考：
- usersテーブルとnewsfeedsテーブルの中間テーブルとしている
- newsfeedsは複数の（送信先となる）userを持つ。（１つのお知らせは送信先の複数のuserとつながっている）
- userは複数のお知らせを持つ。（userは複数のお知らせとつながっている）
- 上記の関係性からusersテーブルとnewsfeedsテーブルには多対多の関係が成り立つ。そのためにuser_notificationsを中間テーブルとしている

## newsfeedsテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|null: false  |
|body|text|null: false  |
|sent_at|integer|timestamp  |
|personal_flag|boolean|default: false, null: false|

### Association
- has_many :users through::users_notifications
- has_many :users_notifications

##### 備考：
- personal_flagは個別メッセージのフラグとして使用する。デフォルト設定を追加した。


## likesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, ƒ: true|
|product|references|null: false, foreign_key: true|
### Association
- belongs_to :product
- belongs_to :user

##### 備考：
- いいね！機能実装ために作成。
- userは複数のいいねを持つ。（いいねをした複数の商品とつながっている）
- producは複数のいいねを持つ。（いいねを押した複数のユーザーとつながっている）
- 上記の関係性からuserとproductには多対多の関係が成り立つ。そのためにlikesを中間テーブルとしている


## productsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false  |
|description|text|null: false  |
|category|references|null: false, foreign_key: true|
|condition|references|null: false, foreign_key: true|
|delivery_fee|references|null: false, foreign_key: true|
|packing_day|references|null: false, foreign_key: true|
|price|integer|null: false|
|size|string|null: false|
|brand|references|foreign_key: true|


### Association
- has_many :users,through: :likes
- has_many :likes
- has_many :product_images
- has_many :images,through: :product_images
- has_many :transactions

##### 備考：
- productテーブルはtransaction-Userでつなぐべきなのか？
- 現状、productテーブルはbuyer/seller-Userでつないでいる。


## brandsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false  add_index: true|
|category|references|null: false, foreign_key: true|

### Association
- belongs_to :top_category
- has_many :products

##### 備考：
- ブランド名で検索するのでインデックスを追加

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|parent|references|null: false  foreign_key: true|

### Association
- belongs_to :parent, class_name: :Category
- has_many :children, class_name: :Category, foreign_key: :parent_id

##### 備考：
- 自己結合モデルでアソシエーションを組んでいる。一つのデーブルに全てのカテゴリーを格納して、親子関係を設定

## conditionsテーブル
|Column|Type|Options|
|------|----|-------|
|description|text|null: false |

## delivery_feesテーブル
|Column|Type|Options|
|------|----|-------|
|payment|string|null: false |


## product_imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image|references|null: false, foreign_key: true|
|product|references|null: false, foreign_key: true|

### Association
- belongs_to :product
- belongs_to :image

##### 備考：
- productは最大１０枚の写真を投稿できるため、中間テーブルを作成。


## imagesテーブル
|Column|Type|Options|
|------|----|-------|
|image_file_name|string|null: false|
### Association
- has_many :products,through: :product_images
- has_many :product_images

##### 備考：
- product_imagesを中間テーブルとしている
- imageのファイル名はstringが一般的とのこと

## packing_daysテーブル
|Column|Type|Options|
|------|----|-------|
|packing_day|string|null: false|

