import "../styles/footer.css";

const Footer = () => {
	return (
		<footer>
			<span className="copyright">
				Copyright © {new Date(Date.now()).getFullYear()} - DECKERT Michel
			</span>
			<a
				target="_blank"
				rel="noreferrer"
				href="mailto:deckertmichel@gmail.com"
				className="footer-link">
				Contact
			</a>
		</footer>
	);
};

export default Footer;
