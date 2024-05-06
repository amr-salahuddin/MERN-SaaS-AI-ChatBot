import { TypeAnimation } from 'react-type-animation';

const TypingAnim = () => {
    return (
        <TypeAnimation
            sequence={[
                "Chat With Your OWN AI",
                1000,
                "Built With OpenAI 🤖",
                2000,
                "Your Own Customized ChatGPT 💻",
                1500,
                () => {
                },
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ fontSize: '60px', display: 'inline-block' }}
        />
    );
};

export default TypingAnim
