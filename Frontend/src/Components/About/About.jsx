import { motion } from 'framer-motion';
import './Team.css';
import carlos from './carlos.png';
import leon from './Leon.png';
import cristian from './Cristian1.png';

const members = [
    {
        name: ' Juan Miguel León Gómez',
        role: 'Backend Trainer',
        photo: leon,
    },
    {
        name: 'Cristian Camilo Domínguez Gutiérrez',
        role: 'Backend Trainer',
        photo: cristian,
    },
    {
        name: 'Carlos Alzate',
        role: 'Backend Trainer',
        photo: carlos,
    },
    {
        name: 'Edwin Andres Guerrero Diaz', 
        role: 'Frontend Trainer',
        photo: 'ruta_de_la_foto_4',
    },
];

const Team = () => {
    return (
        <div className="team-container">
            {members.map((member, index) => (
                <motion.div
                    className="team-member"
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <img src={member.photo} alt={member.name} className="member-photo" />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                    <p>{member.contribution}</p>
                </motion.div>
            ))}
        </div>
    );
};

export default Team;
