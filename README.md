##membersテーブル
|Column|Type|Options| 
|------|----|-------| 
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|

Association
belongs_to :group
belongs_to :user

##usersテーブル
|Column|Type|Options| 
|------|----|-------| 
|name|string|null: false|
|email|integer|null: false, unique: true|

Association
has_many :members
has_many :messages
has_many :groups, through: :members

##groupsテーブル 
|Column|Type|Options| 
|------|----|-------| 
|name|string|null: false|

Association
has_many :members
has_many :messages
has_many :users, through: :members

##messagesテーブル 
|Column|Type|Options| 
|------|----|-------| 
|user_id|integer|null: false, foreign_key: true, index: true| 
|group_id|integer|null: false, foreign_key: true, index: true| 
|body|text| 
|image|string|

Association
belongs_to :group
belongs_to :user
