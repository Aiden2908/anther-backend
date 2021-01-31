DROP TABLE users_details;

CREATE TABLE users_details(
	id INT(11) NOT NULL UNIQUE,
    
    display_name VARCHAR(12),
    sex ENUM("M", "F"),
    sexual_orientation ENUM("Straight", "Gay", "Lesbian", "Bisexual", "Asexual", "Transexual", "Pansexual", "Questioning", "Other"),
    purpose ENUM("date", "chat_and_meet_new_people", "see_what_happens"),

    dob DATE,

    relation_status ENUM("Single", "Open", "Taken", "Complicated", "void"),
   	interests JSON,

    school_name VARCHAR(156),
    school_major VARCHAR(156),
    school_graduated BOOLEAN,

    profession VARCHAR(156),
    workplace_name VARCHAR(156),

    drinking_habbit ENUM("A_drinker", "Not_a_drinker", "A_occasional_drinker", "void"),
    smoking_habbit ENUM("A_smoker", "Not_a_smoker", "void"),

    height DECIMAL,
    height_unit ENUM("cm", "ft"),

    about_you VARCHAR(255),

    kids ENUM("Want_them_someday", "Don't_want_kids", "Already_have_kids", "Haven't_decided_yet", "void"),

    photos JSON,
    
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);
