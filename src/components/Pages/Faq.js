import React, { Component } from 'react';

class Faq extends Component {
    render() {
        return (
            <>
            <div className='container container-fluid bg-light rounded p-3 col-md-12'>
                <div className="ratio ratio-16x9">
                    <iframe className="embed-responsive-item"  src="https://player.vimeo.com/video/710623013?h=850fb779c0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>

            <div className='container container-fluid bg-light rounded p-3 col-md-12 mt-3'>
                <div className="ratio ratio-16x9">
                    <iframe className="embed-responsive-item"  src="https://player.vimeo.com/video/707514318?h=29b3fef91d" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            </>
        );
    }
}

export default Faq;