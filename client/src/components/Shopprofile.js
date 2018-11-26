import React, { Component } from 'react';
import * as qs from 'query-string';
import StarRating from './StarRating';

class Shopprofile extends Component {
    constructor() {
        super();
        this.state = {
			address: null,
			description: null,
			image_url: null,
			items: [],
			shop_id:  null,
			shop_name:  null,
			_id:  null
			
        };
      }
  

  componentDidMount() {

	 let selectQuParms = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).shop_name;
	console.log("-------------------");
	console.log(selectQuParms);
	console.log("-------------------");

	this.loadShops(selectQuParms);

  }



  loadShops = (selectQuParms) => {
	
	function buildUrl(url, parameters) {
        let qs = "";
        for (const key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                const value = parameters[key];
                qs +=
                    encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
            }
        }
        if (qs.length > 0) {
            qs = qs.substring(0, qs.length - 1);
            url = url + "?" + qs;
        }
    
        return url;
    }		

	fetch(
		buildUrl('/api/foods', {
			key: selectQuParms
		}),
		{
			method: "GET"
		}
	)
		  .then(data => data.json())
		  .then((res) => {
			if (!res.success) this.setState({ error: res.error });
			else {
				console.log("res")
				console.log(res)
				this.setState({
					address: res.data[0].address,
					description: res.data[0].description,
					image_url: res.data[0].image_url,
					items: res.data[0].items,
					shop_name:  res.data[0].shop_name,
					_id:  res.data[0]._id
					
				})
			}
		  });
    
  }

  renderfoods(){
	console.log("this.state.items"); 
	  console.log(this.state.items);
	let shopElement1;
	if(this.state.items)
	{
			shopElement1 = this.state.items.map(i=>{
		
return (

			
					
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src={i.image_url} alt="" /></a>
								<h3><a href="#">{i.item_name}</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
					
					
)
			
			})

			return shopElement1
	 }


  }


  render() {


// 	let shopElement1;
// 	if(this.state.items)
// 	{
// 			shopElement1 = this.state.items.map(i=>{
		
// return (

// 			<article id="portfolio" className="wrapper style3">
// 				<div className="container">
// 					<header>
// 						<h2>Here’s Our Foods.</h2>
// 					</header>
// 					<div className="row">
// 						<div className="col-4 col-6-medium col-12-small">
// 							<article className="box style2">
// 								<a href="#" className="image featured"><img src={i.image_url} alt="" /></a>
// 								<h3><a href="#">{i.item_name}</a></h3>
// 								<p>We have the best foods</p>
// 							</article>
// 						</div>
// 					</div>
// 					<footer>
// 						<a href="#contact" className="button large scrolly">Get in touch with us</a>
// 					</footer>
// 				</div>
// 			</article>
// )
			
// 			})

// 			return shopElement1
// 	 }
	 


     return (
      <body className="is-preload">

			<nav id="nav">
				<ul className="container">
					<li><a href="#top">Introduction</a></li>
					<li><a href="#work">Work</a></li>
					<li><a href="#portfolio">Foods</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</nav>

			<article id="top" className="wrapper style1">
				<div className="container">
					<div className="row">
						<div className="col-4 col-5-large col-12-medium">
							<span className="image fit"><img src={this.state.image_url} alt="" /></span>
						</div>
						<div className="col-8 col-7-large col-12-medium">
							<header>
								<h1>Hi. This is <strong>{this.state.shop_name}</strong>.</h1>
							</header>
							<p>{this.state.shop_name} which is inspired by Sri Lankan Food Culture. Sri Lankan style less sugar cake,very soft pancake, Volumy but healthy Naughty sandwiches. Matcha desserts and cakes. Natural high quality loose leaf tea, pure arabica Sri Lankan coffee.</p>
							<a href="#work" className="button large scrolly">Learn about what I do</a>
						</div>
					</div>
				</div>
			</article>

			<article id="work" className="wrapper style2">
				<div className="container">
					<header>
						<h2>Here's all the stuff We do.</h2>
					</header>

					<div className="row aln-center">
						<div className="col-4 col-6-medium col-12-small">
							<section className="box style1">
								<span className="image fit"><img src="images/online.png" alt="" /></span>
								<h3>Online Delivery</h3>
								<p>Make it easy</p>
							</section>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<section className="box style1">
								<span><img src="images/Delivery.jpeg" alt="" /></span>
								<h3>Food Delivery</h3>
								<p>Food Delivery is done by {this.state.shop_name} to satisfy our Customers as much as we can.</p>
							</section>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<section className="box style1">
								<span><img src="images/parking.png" alt="" /></span>
								<h3>Parking Option</h3>
								<p>Parking Option is provided to the Customers of {this.state.shop_name}.Join with us and take the chance</p>
							</section>
						</div>
					</div>
					<footer>
						<a href="#portfolio" className="button large scrolly">See our Foods</a>
					</footer>
				</div>
			</article>


{/* 	
			<article id="portfolio" className="wrapper style3">
				<div className="container">
					<header>
						<h2>Here’s Our Foods.</h2>
					</header>
					<div className="row">
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://img.taste.com.au/c7y_bfoK/taste/2016/11/peking-noodles-93892-1.jpeg" alt="" /></a>
								<h3><a href="#">Noodles</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXArpyx6L308WLB32RddFOfIBlGDGSkFUGNq7tpoGqHf0xcYpgIg" alt="" /></a>
								<h3><a href="#">Pasta</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTentyjothkCDZo0aGfwjR14RAMuRqMeAOJEVAalOBTxeLZQMkK" alt="" /></a>
								<h3><a href="#">Rice & Curry</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTentyjothkCDZo0aGfwjR14RAMuRqMeAOJEVAalOBTxeLZQMkK" alt="" /></a>
								<h3><a href="#">Biriyani</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffAlokPl0xiJn4h46PM662AqfSWYJ9Tl6SHVOf32YDwTOA4fXVA" alt="" /></a>
								<h3><a href="#">Dosa</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
						<div className="col-4 col-6-medium col-12-small">
							<article className="box style2">
								<a href="#" className="image featured"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXArpyx6L308WLB32RddFOfIBlGDGSkFUGNq7tpoGqHf0xcYpgIg" alt="" /></a>
								<h3><a href="#">Fried Rice</a></h3>
								<p>We have the best foods</p>
							</article>
						</div>
					</div>
					<footer>
						<a href="#contact" className="button large scrolly">Get in touch with us</a>
						
						<StarRating/>
					</footer>
				</div>
			</article> */}
			<article id="portfolio" className="wrapper style3">
				<div className="container">
					<header>
						<h2>Here’s Our Foods.</h2>
					</header>
					<div className="row">{this.renderfoods()}</div>
			<footer>
						<a href="#contact" className="button large scrolly">Get in touch with us</a>
						<StarRating/>
					</footer>
				</div>
			</article>
			



			<article id="contact" className="wrapper style4">
				<div className="container medium">
					<header>
						<h2>Contact Us</h2>
					</header>
					<div className="row">
						<div className="col-12">
							<form method="post" action="#">
								<div className="row">
									<div className="col-6 col-12-small">
										<input type="text" name="name" id="name" placeholder="Name" />
									</div>
									<div className="col-6 col-12-small">
										<input type="text" name="email" id="email" placeholder="Email" />
									</div>
									<div className="col-12">
										<input type="text" name="subject" id="subject" placeholder="Subject" />
									</div>
									<div className="col-12">
										<textarea name="message" id="message" placeholder="Message"></textarea>
									</div>
									<div className="col-12">
										<ul className="actions">
											<li><input type="submit" value="Send Message" /></li>
											<li><input type="reset" value="Clear Form" className="alt" /></li>
										</ul>
									</div>
								</div>
							</form>
						</div>
						<div className="col-12">
							<hr />
							<h3>Find us on ...</h3>
							<ul className="social">
								<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
								<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
								<li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
								<li><a href="#" className="icon fa-linkedin"><span className="label">LinkedIn</span></a></li>
								<li><a href="#" className="icon fa-tumblr"><span className="label">Tumblr</span></a></li>
								<li><a href="#" className="icon fa-google-plus"><span className="label">Google+</span></a></li>
								<li><a href="#" className="icon fa-github"><span className="label">Github</span></a></li>
								
								
							</ul>
							<hr />
						</div>
					</div>
					<footer>
						<ul id="copyright">
							<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
						</ul>
					</footer>
				</div>
			</article>
            </body>
            );


     
     
  }
}

export default Shopprofile;