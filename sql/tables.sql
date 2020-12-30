CREATE TABLE users_details(
	id INT(11) NOT NULL UNIQUE,
    
    sex ENUM("I'm a man", "I'm a woman", "Other"),
    dob DATE,

    aim ENUM("I'm here to date", "I'm here to meet new people", "I'm here to see what happens"),
    sexual_orientation ENUM("Straight", "Gay/Lesbian", "Bisexual", "Asexual", "Pansexual", "Demisexual", "Quetioning", "Prefer not to say", "Other"),
    relation_status ENUM("Single", "Taken", "Complicated", "Prefer not to say"),
    
    school VARCHAR(100),
    education ENUM("High school", "Certificate", "Bachelors", "Masters", "Doctorate", "Prefer not to say"),
    profession INT(4),
    
   	hobbies JSON,
    
    drink_alcohol ENUM("Yes", "No", "Sometimes", "Prefer not to say"),
    smoke ENUM("Yes", "No", "Sometimes", "Prefer not to say"),

    height DECIMAL,
    show_height BOOLEAN,

    ethinicitiy TINYINT UNSIGNED,

    kids ENUM("Want them someday", "Don't want kids", "Already Have kids", "Haven't decided yet", "Prefer not to say"),

    personal_statement VARCHAR(500),


    images JSON,
    
    FOREIGN KEY (ethinicitiy) REFERENCES ethinicities(id),
    FOREIGN KEY (profession) REFERENCES professions(id),
    FOREIGN KEY (id) REFERENCES users(id)
);
